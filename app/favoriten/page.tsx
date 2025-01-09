'use client';

import { useState, useEffect } from 'react';
import { getFavorites, FavoriteItem } from '../utils/favorites';
import FavoriteCard from '../components/FavoriteCard';

export default function Favoriten() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [selectedType, setSelectedType] = useState<'all' | 'quicktask' | 'image' | 'multimedia'>('all');

    useEffect(() => {
        // Update favorites when component mounts and when items are added/removed
        const updateFavorites = () => {
            setFavorites(getFavorites());
        };

        updateFavorites();
        window.addEventListener('storage', updateFavorites);
        return () => window.removeEventListener('storage', updateFavorites);
    }, []);

    const filteredFavorites = favorites.filter(
        item => selectedType === 'all' || item.type === selectedType
    );

    const groupedFavorites = filteredFavorites.reduce((acc, item) => {
        const category = item.category || 'Sonstige';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {} as Record<string, FavoriteItem[]>);

    return (
        <div className="p-6">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                    Favoriten
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Hier finden Sie Ihre gespeicherten Favoriten aus allen Kategorien.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {(['all', 'quicktask', 'image', 'multimedia'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${selectedType === type
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            {type === 'all' ? 'Alle' :
                                type === 'quicktask' ? 'Quicktasks' :
                                    type === 'image' ? 'Bilder' : 'Multimedia'}
                        </button>
                    ))}
                </div>
            </header>

            {favorites.length === 0 ? (
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-white p-8 rounded-lg border shadow-sm">
                        <p className="text-gray-600 mb-4">
                            Noch keine Favoriten vorhanden. Fügen Sie Favoriten aus den verschiedenen Kategorien hinzu, um sie hier schnell wiederzufinden.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedFavorites).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {items.map((item) => (
                                    <FavoriteCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
