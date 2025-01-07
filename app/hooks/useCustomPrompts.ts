'use client';

import { useState, useEffect } from 'react';
import { CustomPrompt } from '../types/prompts';

const STORAGE_KEY = 'nextmove_custom_prompts';

export function useCustomPrompts() {
    const [prompts, setPrompts] = useState<CustomPrompt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load prompts from localStorage on mount
    useEffect(() => {
        const loadPrompts = () => {
            const savedPrompts = localStorage.getItem(STORAGE_KEY);
            if (savedPrompts) {
                try {
                    setPrompts(JSON.parse(savedPrompts));
                } catch (error) {
                    console.error('Failed to parse saved prompts:', error);
                }
            }
            setIsLoading(false);
        };

        loadPrompts();
    }, []);

    // Save prompts to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
        }
    }, [prompts, isLoading]);

    const addPrompt = (promptData: Omit<CustomPrompt, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => {
        const now = new Date().toISOString();
        const newPrompt: CustomPrompt = {
            id: crypto.randomUUID(),
            ...promptData,
            isActive: true,
            createdAt: now,
            updatedAt: now,
        };
        setPrompts(prev => [...prev, newPrompt]);
        return newPrompt;
    };

    const updatePrompt = (id: string, updates: Partial<CustomPrompt>) => {
        setPrompts(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, ...updates, updatedAt: new Date().toISOString() }
                    : p
            )
        );
    };

    const deletePrompt = (id: string) => {
        setPrompts(prev => prev.filter(p => p.id !== id));
    };

    const togglePromptActive = (id: string) => {
        setPrompts(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() }
                    : p
            )
        );
    };

    return {
        prompts,
        isLoading,
        addPrompt,
        updatePrompt,
        deletePrompt,
        togglePromptActive,
    };
}
