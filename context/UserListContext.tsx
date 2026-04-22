import React, { createContext, useContext, useState } from 'react';
import { ListConfig } from '../types';

interface UserListsContextType {
    lists: ListConfig[];
    addList: (list: ListConfig) => void;
    removeList: (id: string) => void;
    reorderLists: (newOrder: ListConfig[]) => void;
    toggleHomeVisibility: (id: string) => void;
}

const UserListsContext = createContext<UserListsContextType | null>(null);

export function UserListsProvider({ children }: { children: React.ReactNode })
{
    const [lists, setLists] = useState<ListConfig[]>([
        {
            id: 'trending',
            title: 'Trending Now',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '1', title: 'BloodHounds 3', posterUrl:require('../assets/posters/Genre/Action/BloodHounds3.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
                { id: '2', title: 'Coco', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/Coco.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
                { id: '3', title: 'The Croods', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/TheCroods.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
                { id: '4', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' }

            ],
        },
        {
            id: 'myList',
            title: 'My List',
            type: 'custom',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '4', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
                { id: '5', title: 'We Bare Bears', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/WeBareBears.webp'), type: 'show', font: 'BebasNeue', genre: 'ChildrenAndFamily'},
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

    return (
        <UserListsContext.Provider value={{ lists, addList, removeList, reorderLists, toggleHomeVisibility }}>
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