'use client';

import { useState, useEffect } from 'react';
import { CustomPrompt, DefaultPrompts } from '../types/prompts';

const STORAGE_KEY = 'nextmove_custom_prompts';

interface ChatPrompt {
    title: string;
    prompt: string;
    category: string;
    description: string;
    useCase: string;
    isCustom?: boolean;
    isActive?: boolean;
}

export function useChatPrompts() {
    const [allPrompts, setAllPrompts] = useState<ChatPrompt[]>([]);
    const [promptsByCategory, setPromptsByCategory] = useState<Record<string, { description: string; length: number; prompts: ChatPrompt[] }>>({});
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
                            description: prompt.description,
                            useCase: prompt.useCase,
                            isCustom: false,
                        }))
                    ),
                    // Map custom prompts
                    ...customPrompts.map(prompt => ({
                        title: prompt.title,
                        prompt: prompt.prompt,
                        category: prompt.category,
                        description: prompt.description || 'Benutzerdefinierter Prompt',
                        useCase: prompt.useCase || 'Individuell angepasst für Ihre Bedürfnisse',
                        isCustom: true,
                        isActive: prompt.isActive,
                    }))
                ];

                // Group prompts by category with category description
                const groupedPrompts = defaultPrompts.categories.reduce<Record<string, { description: string; length: number; prompts: ChatPrompt[] }>>((acc, category) => {
                    // Initialize category with its description from defaultPrompts
                    acc[category.name] = {
                        description: category.description,
                        length: 0,
                        prompts: []
                    };

                    // Find all prompts for this category
                    const categoryPrompts = combinedPrompts.filter(p => p.category === category.name);
                    acc[category.name].prompts = categoryPrompts;
                    acc[category.name].length = categoryPrompts.length;

                    return acc;
                }, {});

                setAllPrompts(combinedPrompts);
                setPromptsByCategory(groupedPrompts);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load prompts:', error);
                setIsLoading(false);
            }
        };

        loadPrompts();
    }, []);

    return {
        prompts: allPrompts,
        promptsByCategory,
        isLoading,
    };
}
