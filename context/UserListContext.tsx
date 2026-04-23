import React, { createContext, useContext, useState } from 'react';
import { ListConfig, ContentItem, ActorItem } from '../types/';

interface UserListsContextType {
  lists: ListConfig[];
  favorites: ContentItem[];
  actors: ActorItem[];
  addList: (list: ListConfig) => void;
  removeList: (id: string) => void;
  reorderLists: (newOrder: ListConfig[]) => void;
  toggleHomeVisibility: (id: string) => void;
  toggleFavorite: (listId: string, itemId: string) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  addItemToList: (listId: string, item: ContentItem) => void;
  addFavorite: (item: ContentItem) => void;
  removeFavorite: (id: string) => void;
  addActor: (actor: ActorItem) => void;
  removeActor: (id: string) => void;
}

const UserListsContext = createContext<UserListsContextType | null>(null);

export function UserListsProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<ListConfig[]>([
    {
      id: 'trending',
      title: 'Trending Now',
      type: 'category',
      font: 'BebasNeue',
      order: 1,
      visibleOnHome: true,
      items: [
        { id: '1', title: 'Blood Hounds 2', posterUrl: require('../assets/posters/Genre/Action/BloodHounds3.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
        { id: '2', title: 'Coco', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/Coco.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
        { id: '3', title: 'The Croods', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/TheCroods.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
        { id: '4', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
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
      type: 'category',
      font: 'BebasNeue',
      order: 1,
      visibleOnHome: true,
      items: [
        { id: '9', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
        { id: '10', title: 'We Bare Bears', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/WeBareBears.webp'), type: 'show', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
      ],
    },
  ]);

  const [favorites, setFavorites] = useState<ContentItem[]>([]);
  const [actors, setActors] = useState<ActorItem[]>([]);

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

  const addItemToList = (listId: string, item: ContentItem) =>
    setLists(prev =>
      prev.map(list =>
        list.id === listId && !list.items.find(i => i.id === item.id)
          ? { ...list, items: [...list.items, item] }
          : list
      )
    );

  const addFavorite = (item: ContentItem) =>
    setFavorites(prev => prev.find(f => f.id === item.id) ? prev : [...prev, item]);

  const removeFavorite = (id: string) =>
    setFavorites(prev => prev.filter(f => f.id !== id));

  const addActor = (actor: ActorItem) =>
    setActors(prev => prev.find(a => a.id === actor.id) ? prev : [...prev, actor]);

  const removeActor = (id: string) =>
    setActors(prev => prev.filter(a => a.id !== id));

  return (
    <UserListsContext.Provider value={{
      lists, favorites, actors,
      addList, removeList, reorderLists,
      toggleHomeVisibility, toggleFavorite,
      removeItemFromList, addItemToList,
      addFavorite, removeFavorite,
      addActor, removeActor,
    }}>
      {children}
    </UserListsContext.Provider>
  );
}

export function useUserLists() {
  const ctx = useContext(UserListsContext);
  if (!ctx) throw new Error('useUserLists must be used inside UserListsProvider');
  return ctx;
}