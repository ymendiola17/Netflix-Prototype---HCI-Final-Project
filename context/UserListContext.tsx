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
  { id: 'trending', title: 'Trending Now', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '1', title: 'Blood Hounds 2', posterUrl: require('../assets/posters/Genre/Action/BloodHounds3.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
    { id: '2', title: 'Coco', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/Coco.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
    { id: '3', title: 'The Croods', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/TheCroods.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
    { id: '4', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
  ]},
  { id: 'KeepWatching', title: 'Keep Watching', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '5', title: 'Alice in Borderland', posterUrl: require('../assets/posters/Genre/Action/AliceIBorderland.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
    { id: '6', title: 'Dragon Ball Z: Resurrection F', posterUrl: require('../assets/posters/Genre/Anime/DragonBallZ-ResurrectionF.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
    { id: '7', title: 'Beauty and the Beast', posterUrl: require('../assets/posters/Genre/Romance/BeautyAndTheBeast.webp'), type: 'show', font: 'BebasNeue', genre: 'Romance' },
    { id: '8', title: 'Weightlifting Fairy Kuroko', posterUrl: require('../assets/posters/Genre/Romance/WeightliftingFairy.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
  ]},
  { id: 'Top 10 in the US', title: 'Top 10 in the US', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '9', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
    { id: '10', title: 'We Bare Bears', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/WeBareBears.webp'), type: 'show', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
  ]},
  { id: 'Romance', title: 'Romance', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '11', title: 'Anonymously Yours', posterUrl: require('../assets/posters/Genre/Romance/AnonymouslyYours.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
    { id: '12', title: 'Beauty and the Beast', posterUrl: require('../assets/posters/Genre/Romance/BeautyAndTheBeast.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
    { id: '13', title: 'Isi & Ossi', posterUrl: require('../assets/posters/Genre/Romance/IsiandOssi.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
    { id: '14', title: 'Quieres Ser mi Novia?', posterUrl: require('../assets/posters/Genre/Romance/QuieresSerMiNovia.webp'), type: 'movie', font: 'BebasNeue', genre: 'Romance' },
    { id: '15', title: 'WeightLifting Fairy Kim Bok-Joo', posterUrl: require('../assets/posters/Genre/Romance/WeightliftingFairy.webp'), type: 'show', font: 'BebasNeue', genre: 'Romance' },
  ]},
  { id: 'Comedy', title: 'Comedy', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '16', title: 'Fletch', posterUrl: require('../assets/posters/Genre/Comedy/Fletch.webp'), type: 'movie', font: 'BebasNeue', genre: 'Comedy' },
    { id: '17', title: 'Modern Family', posterUrl: require('../assets/posters/Genre/Comedy/ModernFamily.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy' },
    { id: '18', title: 'The Simpsons', posterUrl: require('../assets/posters/Genre/Comedy/TheSimpson.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy' },
    { id: '19', title: 'White Chicks', posterUrl: require('../assets/posters/Genre/Comedy/WhiteChicks.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy' },
    { id: '20', title: 'Young Sheldon', posterUrl: require('../assets/posters/Genre/Comedy/YoungSheldon.webp'), type: 'show', font: 'BebasNeue', genre: 'Comedy' },
  ]},
  { id: 'Anime', title: 'Anime', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '21', title: 'Dragon Ball Z: Resurrection F', posterUrl: require('../assets/posters/Genre/Anime/DragonBallZ-ResurrectionF.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
    { id: '22', title: 'One Piece', posterUrl: require('../assets/posters/Genre/Anime/OnePiece.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
    { id: '23', title: 'Naruto', posterUrl: require('../assets/posters/Genre/Anime/Naruto.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
    { id: '24', title: 'Spirited Away', posterUrl: require('../assets/posters/Genre/Anime/SpiritedAway.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
    { id: '25', title: 'Godzilla: Planet of the Monsters', posterUrl: require('../assets/posters/Genre/Anime/Godzilla-PlanetOfTheMonsters.webp'), type: 'show', font: 'BebasNeue', genre: 'Anime' },
  ]},
  { id: 'Family', title: 'Family', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '26', title: 'The Princess and the Frog', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/ThePrincessAndTheFrog.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
    { id: '27', title: 'Despicable Me 4', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/DespicableMe4.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
    { id: '28', title: 'Finding Nemo', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/FindingNemo.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
    { id: '29', title: 'Shrek', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/Shrek.webp'), type: 'movie', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
    { id: '30', title: 'Masha and the Bear', posterUrl: require('../assets/posters/Genre/ChildrenAndFamily/MashaAndTheBear.webp'), type: 'show', font: 'BebasNeue', genre: 'ChildrenAndFamily' },
  ]},
  { id: 'Action', title: 'Action', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '31', title: 'Alice in the Borderland', posterUrl: require('../assets/posters/Genre/Action/AliceIBorderland.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
    { id: '32', title: 'Formula 1', posterUrl: require('../assets/posters/Genre/Action/F1.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
    { id: '33', title: 'Weak Hero', posterUrl: require('../assets/posters/Genre/Action/WeakHero.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
    { id: '34', title: 'BloodHounds 3', posterUrl: require('../assets/posters/Genre/Action/BloodHounds3.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
    { id: '35', title: 'War Machine', posterUrl: require('../assets/posters/Genre/Action/WarMachine.webp'), type: 'show', font: 'BebasNeue', genre: 'Action' },
  ]},
  { id: 'Horror', title: 'Horror', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '36', title: 'Z', posterUrl: require('../assets/posters/Genre/Horror/Z.webp'), type: 'movie', font: 'BebasNeue', genre: 'Horror' },
    { id: '37', title: 'Dead of the Night', posterUrl: require('../assets/posters/Genre/Horror/DeadOfTheNight.webp'), type: 'show', font: 'BebasNeue', genre: 'Horror' },
    { id: '38', title: 'Race with the Devil', posterUrl: require('../assets/posters/Genre/Horror/RacewiththeDevil.webp'), type: 'movie', font: 'BebasNeue', genre: 'Horror' },
    { id: '39', title: 'The Mortuary Assistant', posterUrl: require('../assets/posters/Genre/Horror/TheMortuaryAssistant.webp'), type: 'show', font: 'BebasNeue', genre: 'Horror' },
    { id: '40', title: 'Undertone', posterUrl: require('../assets/posters/Genre/Horror/undertone.webp'), type: 'movie', font: 'BebasNeue', genre: 'Horror' },
  ]},
  { id: 'Sci-Fi', title: 'Sci-Fi', type: 'category', font: 'BebasNeue', order: 1, visibleOnHome: true, items: [
    { id: '41', title: 'Avatar', posterUrl: require('../assets/posters/Genre/Sci-fi/Avatar-FireAndAsh.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi' },
    { id: '42', title: 'Hail Mary', posterUrl: require('../assets/posters/Genre/Sci-fi/HailMary.webp'), type: 'show', font: 'BebasNeue', genre: 'Sci-Fi' },
    { id: '43', title: 'Regular Show', posterUrl: require('../assets/posters/Genre/Sci-fi/RegularShow.webp'), type: 'show', font: 'BebasNeue', genre: 'Sci-Fi' },
    { id: '44', title: 'Teen Wolf', posterUrl: require('../assets/posters/Genre/Sci-fi/TeenWolf.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi' },
    { id: '45', title: 'The Rain', posterUrl: require('../assets/posters/Genre/Sci-fi/TheRain.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi' },
    { id: '46', title: 'Stranger Things', posterUrl: require('../assets/posters/Genre/Sci-fi/StrangerThings.webp'), type: 'movie', font: 'BebasNeue', genre: 'Sci-Fi' },
  ]},
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