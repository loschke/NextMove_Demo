'use client';

import { useState, useEffect } from 'react';
import { Assistant, MarketingData } from '../types/assistants';
import marketingData from '../data/marketingAssistants.json';
import { useCustomAssistants } from './useCustomAssistants';

export function useAssistants() {
    const [allAssistants, setAllAssistants] = useState<Assistant[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { assistants: customAssistants } = useCustomAssistants();

    useEffect(() => {
        const defaultAssistants = (marketingData as MarketingData).assistants.map(assistant => ({
            ...assistant,
            isCustom: false,
            isActive: true
        }));

        const activeCustomAssistants = customAssistants
            .filter(assistant => assistant.isActive)
            .map(assistant => ({
                ...assistant,
                isCustom: true
            }));

        // Combine default and custom assistants
        const combined = [...defaultAssistants, ...activeCustomAssistants];

        // Get unique categories
        const allCategories = ["All", ...Array.from(new Set(combined.map(a => a.category)))];

        setAllAssistants(combined);
        setCategories(allCategories);
        setIsLoading(false);
    }, [customAssistants]);

    return {
        assistants: allAssistants,
        categories,
        isLoading
    };
}
