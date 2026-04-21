import React, { createContext, useContext, useState } from 'react';
import { ListConfig } from '../types';

interface UserListsContextType {
    lists: ListConfig[];
    addList: (list: ListConfig) => void;
    removeList: (id: string) => void;
    reorderLists: (newOrder: ListConfig[]) => void;
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
            items: [
                { id: '4', title: 'Movie X', posterUrl: '', type: 'movie' },
                { id: '5', title: 'Movie Y', posterUrl: '', type: 'movie'},
            ],
        },
    ]);

    const addList = (list: ListConfig) =>
        setLists(prev => [...prev, list]);

    const removeList = (id: string) =>
        setLists(prev => prev.filter(1 => 1.id !== id));

    const reorderLists = (newOrder: ListConfig[]) =>
        setLists(newOrder);

    return (
        <UserListsContext.Provider value={{ lists, addList, removeList, reorderLists }}>
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