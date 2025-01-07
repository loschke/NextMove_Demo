export interface FavoriteItem {
    id: string;
    type: 'assistant' | 'image' | 'multimedia';
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
    category?: string;
}

const STORAGE_KEY = 'nextmove_favorites';

export const getFavorites = (): FavoriteItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (item: FavoriteItem): void => {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.id === item.id)) {
        favorites.push(item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
};

export const removeFavorite = (id: string): void => {
    const favorites = getFavorites();
    const filtered = favorites.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const isFavorite = (id: string): boolean => {
    const favorites = getFavorites();
    return favorites.some(item => item.id === id);
};
