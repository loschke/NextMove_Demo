'use client';

import { useState, useEffect } from 'react';
import { CustomPrompt, DefaultPrompts } from '../types/prompts';

const STORAGE_KEY = 'nextmove_custom_prompts';

interface ChatPrompt {
    title: string;
    prompt: string;
    category: string;
    isCustom?: boolean;
    isActive?: boolean;
}

export function useChatPrompts() {
    const [allPrompts, setAllPrompts] = useState<ChatPrompt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPrompts = async () => {
            try {
                // Load default prompts
                const defaultPromptsResponse = await fetch('/data/prompts.json');
                const defaultPrompts: DefaultPrompts = await defaultPromptsResponse.json();

                // Load custom prompts from localStorage
                const savedCustomPrompts = localStorage.getItem(STORAGE_KEY);
                const customPrompts: CustomPrompt[] = savedCustomPrompts
                    ? JSON.parse(savedCustomPrompts)
                    : [];

                // Combine prompts
                const combinedPrompts: ChatPrompt[] = [
                    // Map default prompts
                    ...defaultPrompts.categories.flatMap(category =>
                        category.prompts.map(prompt => ({
                            title: prompt.title,
                            prompt: prompt.prompt,
                            category: category.name,
                            isCustom: false,
                        }))
                    ),
                    // Map custom prompts
                    ...customPrompts.map(prompt => ({
                        title: prompt.title,
                        prompt: prompt.prompt,
                        category: prompt.category,
                        isCustom: true,
                        isActive: prompt.isActive,
                    }))
                ];

                setAllPrompts(combinedPrompts);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load prompts:', error);
                setIsLoading(false);
            }
        };

        loadPrompts();
    }, []);

    // Group prompts by category
    const promptsByCategory = allPrompts.reduce<Record<string, ChatPrompt[]>>((acc, prompt) => {
        if (!acc[prompt.category]) {
            acc[prompt.category] = [];
        }
        acc[prompt.category].push(prompt);
        return acc;
    }, {});

    return {
        prompts: allPrompts,
        promptsByCategory,
        isLoading,
    };
}
