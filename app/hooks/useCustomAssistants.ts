'use client';

import { useState, useEffect } from 'react';
import { CustomAssistant } from '../types/assistants';

const STORAGE_KEY = 'nextmove_custom_assistants';

export function useCustomAssistants() {
    const [assistants, setAssistants] = useState<CustomAssistant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load assistants from localStorage on mount
    useEffect(() => {
        const loadAssistants = () => {
            const savedAssistants = localStorage.getItem(STORAGE_KEY);
            if (savedAssistants) {
                try {
                    setAssistants(JSON.parse(savedAssistants));
                } catch (error) {
                    console.error('Failed to parse saved assistants:', error);
                }
            }
            setIsLoading(false);
        };

        loadAssistants();
    }, []);

    // Save assistants to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(assistants));
        }
    }, [assistants, isLoading]);

    const addAssistant = (assistantData: Omit<CustomAssistant, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString();
        const newAssistant: CustomAssistant = {
            id: crypto.randomUUID(),
            ...assistantData,
            createdAt: now,
            updatedAt: now,
        };
        setAssistants(prev => [...prev, newAssistant]);
        return newAssistant;
    };

    const updateAssistant = (id: string, updates: Partial<CustomAssistant>) => {
        setAssistants(prev =>
            prev.map(a =>
                a.id === id
                    ? { ...a, ...updates, updatedAt: new Date().toISOString() }
                    : a
            )
        );
    };

    const deleteAssistant = (id: string) => {
        setAssistants(prev => prev.filter(a => a.id !== id));
    };

    const toggleAssistantActive = (id: string) => {
        setAssistants(prev =>
            prev.map(a =>
                a.id === id
                    ? { ...a, isActive: !a.isActive, updatedAt: new Date().toISOString() }
                    : a
            )
        );
    };

    return {
        assistants,
        isLoading,
        addAssistant,
        updateAssistant,
        deleteAssistant,
        toggleAssistantActive,
    };
}
