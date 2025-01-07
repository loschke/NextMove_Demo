'use client';

import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

interface FavoriteButtonProps {
    id: string;
    type: 'assistant' | 'image' | 'multimedia';
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
    category?: string;
}

export default function FavoriteButton({
    id,
    type,
    title,
    description,
    icon,
    imageUrl,
    category
}: FavoriteButtonProps) {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(isFavorite(id));
    }, [id]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        if (isFav) {
            removeFavorite(id);
        } else {
            addFavorite({
                id,
                type,
                title,
                description,
                icon,
                imageUrl,
                category
            });
        }
        setIsFav(!isFav);
    };

    return (
        <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors z-10"
            aria-label={isFav ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        >
            {isFav ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )}
        </button>
    );
}
