import React, { createContext, useContext, useState } from 'react';
import { ListConfig } from '../types/';

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
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '1', title: 'The Croods', posterUrl:require('../assets/posters/Genre/Action/BloodHounds3.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
                { id: '2', title: 'Coco', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/Coco.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
                { id: '3', title: 'The Croods', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/TheCroods.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
                { id: '4', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' }

            ],
        },
        {
            id: 'KeepWatching',
            title: 'Keep Watching',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '5', title: 'Alice in Borderland', posterUrl: require('../assets/posters/Genre/Action/AliceIBorderland.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
                { id: '6', title: 'Dragon Ball Z: Resurrection F', posterUrl: require('../assets/posters/Genre/Anime/DragonBallZ-ResurrectionF.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
                { id: '7', title: 'Beauty and the Beast', posterUrl: require('../assets/posters/Genre/Romance/BeautyAndTheBeast.webp'), type: 'show', font: 'BebasNeue', genre: 'Romance' },
                { id: '8', title: 'Weightlifting Fairy Kuroko', posterUrl: require('../assets/posters/Genre/Romance/WeightliftingFairy.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
            ],
        },  
        {

            id: 'Top 10 in the US',
            title: 'Top 10 in the US',
            type: 'custom',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: false,
            items: [
                { id: '9', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
                { id: '10', title: 'We Bare Bears', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/WeBareBears.webp'), type: 'show', font: 'BebasNeue', genre: 'ChildrenAndFamily'},
            ],
        },
        {
            id: 'Romance',
            title: 'Romance',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '11', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
                { id: '12', title: 'Beauty and the Beast', posterUrl: require('../assets/posters/Genre/Romance/BeautyAndTheBeast.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance'},
                {id: '13', title: 'Isi & Ossi', posterUrl: require('../assets/posters/Genre/Romance/IsiandOssi.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance'},
                {id: '14', title: 'Quieres Ser mi Novia?', posterUrl: require('../assets/posters/Genre/Romance/QuieresSerMiNovia.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance'},
                {id: '15', title: 'WeightLifting Fairy Kim Bok-Joo', posterUrl: require('../assets/posters/Genre/Romance/WeightliftingFairy.webp'), type: 'show', font: 'BebasNeue', genre: 'Romance'},
            ],
        },
        {
            id: 'Comedy',
            title: 'Comedy',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '16', title: 'Fletch', posterUrl: require('../assets/posters/Genre/Comedy/Fletch.webp'), type: 'movie', font: 'yBebasNeue', genre: 'Comedy' },
                { id: '17', title: 'Modern Family', posterUrl: require('../assets/posters/Genre/Comedy/ModernFamily.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy'},
                { id: '18', title: 'The Simpsons', posterUrl: require('../assets/posters/Genre/Comedy/TheSimpson.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy'},
                { id: '19', title: 'White Chicks', posterUrl: require('../assets/posters/Genre/Comedy/WhiteChicks.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy'},
                { id: '20', title: 'Young Sheldon', posterUrl: require('../assets/posters/Genre/Comedy/YoungSheldon.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy'},
            ],
        },
        {
            id: 'Anime',
            title: 'Anime',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '16', title: 'Dragon Ball Z: Resurrection F', posterUrl: require('../assets/posters/Genre/Anime/DragonBallZ-ResurrectionF.webp'), type: 'show', font: 'yBebasNeue', genre: 'Anime' },
                { id: '17', title: 'One Piece', posterUrl: require('../assets/posters/Genre/Anime/OnePiece.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime'},    
                { id: '18', title: 'Naruto', posterUrl: require('../assets/posters/Genre/Anime/Naruto.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
                { id: '19', title: 'Spirited Away', posterUrl: require('../assets/posters/Genre/Anime/SpiritedAway.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
                { id: '20', title: 'Godzilla: Planet of the Monsters', posterUrl: require('../assets/posters/Genre/Anime/Godzilla-PlanetOfTheMonsters.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
            ],    
        },
        {
            id: 'Family',
            title: 'Family',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '21', title: 'The Princess and the Frog', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/ThePrincessAndTheFrog.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
                { id: '22', title: 'Desicable Me 4', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/DespicableMe4.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily'},
                {id: '23', title: 'Finding Nemo', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/FindingNemo.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily'},
                {id: '24', title: 'Shrek', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/Shrek.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily'},
                {id: '25', title: 'Masha and the Bear', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/MashaAndTheBear.webp'), type: 'show', font: 'BebasNeue', genre: 'ChildrenAndFamily'},
            ],
        },
        {
            id: 'Action',
            title: 'Action',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '26', title: 'Alice in the Borderland', posterUrl: require('../assets/posters/Genre/Action/AliceIBorderland.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
                { id: '27', title: 'Formula 1', posterUrl: require('../assets/posters/Genre/Action/F1.webp'), type: 'show', font: 'BebasNeue', genre: 'Action'},
                {id: '28', title: 'Weak Hero', posterUrl: require('../assets/posters/Genre/Action/WeakHero.webp'), type: 'show', font: 'BebasNeue', genre: 'Action'},
                {id: '29', title: 'BloodHounds 3', posterUrl: require('../assets/posters/Genre/Action/BloodHounds3.webp'), type: 'show', font: 'BebasNeue', genre: 'Action'},
                {id: '30', title: 'War Machine', posterUrl: require('../assets/posters/Genre/Action/WarMachine.webp'), type: 'show', font: 'BebasNeue', genre: 'Action'},
            ],
        },
        {
            id: 'Horror',
            title: 'Horror',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '31', title: 'Z', posterUrl: require('../assets/posters/Genre/Horror/Z.webp'), type: 'movie', font: 'BebasNeue', genre: 'Horror' },
                { id: '32', title: 'Dead of the Night', posterUrl: require('../assets/posters/Genre/Horror/DeadOfTheNight.webp'), type: 'show', font: 'BebasNeue', genre: 'Horror'},
                {id: '33', title: 'Race with the Devil  ', posterUrl: require('../assets/posters/Genre/Horror/RacewiththeDevil.webp'), type: 'movie', font: 'BebasNeue', genre: 'Horror'},
                {id: '34', title: 'The Mortuary Assistant', posterUrl: require('../assets/posters/Genre/Horror/TheMortuaryAssistant.webp'), type: 'show', font: 'BebasNeue', genre: 'Horror'},
                {id: '35', title: 'Undertone', posterUrl: require('../assets/posters/Genre/Horror/undertone.webp'), type: 'movie', font: 'BebasNeue', genre: 'Horror'},
            ],
        },
        {
            id: 'Sci-Fi',
            title: 'Sci-Fi',
            type: 'category',
            font: 'BebasNeue',
            order: 1,
            visibleOnHome: true,
            items: [
                { id: '36', title: 'Avatar', posterUrl: require('../assets/posters/Genre/Sci-fi/Avatar-FireAndAsh.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi' },
                { id: '37', title: 'Hail Mary', posterUrl: require('../assets/posters/Genre/Sci-fi/HailMary.webp'), type: 'show', font: 'BebasNeue', genre: 'Sci-Fi'},
                {id: '38', title: 'Regular Show', posterUrl: require('../assets/posters/Genre/Sci-fi/RegularShow.webp'), type: 'show', font: 'BebasNeue', genre: 'Sci-Fi'},
                {id: '39', title: 'Teen Wolf', posterUrl: require('../assets/posters/Genre/Sci-fi/TeenWolf.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi'},
                {id: '40', title: 'The Rain', posterUrl: require('../assets/posters/Genre/Sci-fi/TheRain.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi'},
                {id: '41', title: 'Stranger Things', posterUrl: require('../assets/posters/Genre/Sci-fi/StrangerThings.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi'},
            ],
        }
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