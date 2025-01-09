'use client';

import { useState, useEffect } from 'react';
import { CustomQuicktask } from '../types/quicktasks';

const STORAGE_KEY = 'custom_quicktasks';

export function useCustomQuicktasks() {
    const [quicktasks, setQuicktasks] = useState<CustomQuicktask[]>([]);

    useEffect(() => {
        const loadQuicktasks = () => {
            if (typeof window === 'undefined') return;
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    setQuicktasks(JSON.parse(stored));
                } catch (error) {
                    console.error('Error loading custom quicktasks:', error);
                    setQuicktasks([]);
                }
            }
        };

        loadQuicktasks();
    }, []);

    const addQuicktask = (quicktask: Omit<CustomQuicktask, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newQuicktask: CustomQuicktask = {
            ...quicktask,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const updatedQuicktasks = [...quicktasks, newQuicktask];
        setQuicktasks(updatedQuicktasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuicktasks));
    };

    const updateQuicktask = (id: string, updates: Partial<CustomQuicktask>) => {
        const updatedQuicktasks = quicktasks.map(quicktask =>
            quicktask.id === id
                ? { ...quicktask, ...updates, updatedAt: new Date().toISOString() }
                : quicktask
        );
        setQuicktasks(updatedQuicktasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuicktasks));
    };

    const deleteQuicktask = (id: string) => {
        const updatedQuicktasks = quicktasks.filter(quicktask => quicktask.id !== id);
        setQuicktasks(updatedQuicktasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuicktasks));
    };

    const toggleQuicktaskActive = (id: string) => {
        const updatedQuicktasks = quicktasks.map(quicktask =>
            quicktask.id === id
                ? { ...quicktask, isActive: !quicktask.isActive, updatedAt: new Date().toISOString() }
                : quicktask
        );
        setQuicktasks(updatedQuicktasks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuicktasks));
    };

    return {
        quicktasks,
        addQuicktask,
        updateQuicktask,
        deleteQuicktask,
        toggleQuicktaskActive
    };
}
