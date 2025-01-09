'use client';

import { useState, useEffect } from 'react';
import { Quicktask, MarketingData, DefaultQuicktask, CustomQuicktask } from '../types/quicktasks';
import marketingData from '../data/marketingQuicktasks.json';
import { useCustomQuicktasks } from './useCustomQuicktasks';

export function useQuicktasks() {
    const [allQuicktasks, setAllQuicktasks] = useState<Quicktask[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { quicktasks: customQuicktasks } = useCustomQuicktasks();

    useEffect(() => {
        const defaultQuicktasks = (marketingData as MarketingData).quicktasks.map((quicktask: DefaultQuicktask) => ({
            ...quicktask,
            isCustom: false,
            isActive: true
        }));

        const activeCustomQuicktasks = customQuicktasks
            .filter((quicktask: CustomQuicktask) => quicktask.isActive)
            .map((quicktask: CustomQuicktask) => ({
                ...quicktask,
                isCustom: true
            }));

        // Combine default and custom quicktasks
        const combined = [...defaultQuicktasks, ...activeCustomQuicktasks];

        // Get unique categories
        const allCategories = ["All", ...Array.from(new Set(combined.map(q => q.category)))];

        setAllQuicktasks(combined);
        setCategories(allCategories);
        setIsLoading(false);
    }, [customQuicktasks]);

    return {
        quicktasks: allQuicktasks,
        categories,
        isLoading
    };
}
