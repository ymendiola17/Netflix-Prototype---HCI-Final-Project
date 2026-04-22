import React, { createContext, useContext, useState } from 'react';
import { ListConfig } from '../types';

interface UserListsContextType {
    lists: ListConfig[];
    addList: (list: ListConfig) => void;
    removeList: (id: string) => void;
    reorderLists: (newOrder: ListConfig[]) => void;
    toggleHomeVisibility: (id: string) => void;
    toggleFavorite: (listId: string, itemId: string) => void;
    removeItemFromList: (listId: string, itemId: string) => void;
}

const UserListsContext = createContext<UserListsContextType | null>(null);

export function UserListsProvider({ children }: { children: React.ReactNode })
{
    const [lists, setLists] = useState<ListConfig[]>([
        {
            id: 'trending',
            title: 'Trending Now',
            type: 'category',
            order: 0,
            visibleOnHome: true,
            items: [
                { id: '1', title: 'Show A', posterUrl: '', type: 'show' },
                { id: '2', title: 'Show B', posterUrl: '', type: 'show' },
                { id: '3', title: 'Show C', posterUrl: '', type: 'movie' },

            ],
        },
        {
            id: 'myList',
            title: 'My List',
            type: 'custom',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '4', title: 'Movie X', posterUrl: '', type: 'movie' },
                { id: '5', title: 'Movie Y', posterUrl: '', type: 'movie'},
            ],
        },
    ]);

    const addList = (list: ListConfig) =>
        setLists(prev => [...prev, list]);

    const removeList = (id: string) =>
        setLists(prev => prev.filter(l => l.id !== id));

    const reorderLists = (newOrder: ListConfig[]) =>
        setLists(newOrder);

    const toggleHomeVisibility = (id: string) =>
        setLists(prev =>
            prev.map(list =>
                list.id === id ? { ...list, visibleOnHome: !list.visibleOnHome } : list
            )
        );
    
    const toggleFavorite = (listId: string, itemId: string) =>
        setLists(prev =>
            prev.map(list =>
                list.id === listId
                ? {
                    ...list,
                    items: list.items.map(item =>
                        item.id === itemId ? { ...item, isFavorited: !item.isFavorited } : item
                    ),
                }
                : list
            )
        );
    
    const removeItemFromList = (listId: string, itemId: string) =>
        setLists(prev =>
            prev.map(list =>
                list.id === listId
                ? { ...list, items: list.items.filter(item => item.id !== itemId) }
                : list
            )
        );

    return (
        <UserListsContext.Provider value={{ lists, addList, removeList, reorderLists, toggleHomeVisibility, toggleFavorite, removeItemFromList }}>
            {children}
        </UserListsContext.Provider>
    );
}

export function useUserLists() 
{
    const ctx = useContext(UserListsContext);
    if(!ctx) throw new Error('useUserLists must be used inside UserListsProvider');
    return ctx;
}