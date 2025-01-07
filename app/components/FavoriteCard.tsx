'use client';

import { FavoriteItem } from '../utils/favorites';
import FavoriteButton from './FavoriteButton';

interface FavoriteCardProps {
    item: FavoriteItem;
}

export default function FavoriteCard({ item }: FavoriteCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg border hover:shadow-lg transition-shadow relative">
            {item.type === 'image' && item.imageUrl && (
                <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="flex items-center space-x-3 mb-2">
                {item.icon && <span className="text-2xl">{item.icon}</span>}
                <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
            {item.category && (
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {item.category}
                </span>
            )}
            <FavoriteButton
                id={item.id}
                type={item.type}
                title={item.title}
                description={item.description}
                icon={item.icon}
                imageUrl={item.imageUrl}
                category={item.category}
            />
        </div>
    );
}
