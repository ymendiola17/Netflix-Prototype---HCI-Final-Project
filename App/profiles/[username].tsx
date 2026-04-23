import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const USERS = {
  yani: {
    name: 'Yanish',
    username: '@ya._.nim',
    profilePic: require('../../assets/ProfilePictures/yani.jpeg'),
  },
  kamy: {
    name: 'Kamy',
    username: '@kamyy15',
    profilePic: require('../../assets/ProfilePictures/kamy.jpg'),
  },
  amber: {
    name: 'Amber',
    username: '@ambster',
    profilePic: require('../../assets/ProfilePictures/amber.jpg'),
  },
  isaiah: {
    name: 'Isai',
    username: '@theblackblur',
    profilePic: require('../../assets/ProfilePictures/isaiah.jpg'),
  },
} as const;

const USER_DATA = {
  yani: {
    favorites: [
      { id: 'y1', title: 'Dragon Ball Z', posterUrl: require('../../assets/posters/Genre/Anime/DragonBallZ-ResurrectionF.webp') },
      { id: 'y2', title: 'Anonymously Yours', posterUrl: require('../../assets/posters/Genre/Romance/AnonymouslyYours.webp') },
    ],
    actors: [
      { id: 'ya1', name: 'Adam Sandler', image: require('../../assets/actors/AdamSandler.webp') },
      { id: 'ya2', name: 'Anne Hathaway', image: require('../../assets/actors/AnneHathaway.webp') },
    ],
  },
  kamy: {
    favorites: [
      { id: 'k1', title: 'Avatar Fire and Ash', posterUrl: require('../../assets/posters/Genre/Sci-fi/Avatar-FireAndAsh.webp') },
      { id: 'k2', title: 'Project Hail Mary', posterUrl: require('../../assets/posters/Genre/Sci-fi/HailMary.webp')}
    ],
    actors: [
      { id: 'ka1', name: 'Jackie Chan', image: require('../../assets/actors/JackieChan.webp') },
      { id: 'ka2', name: 'Tom Holland', image: require('../../assets/actors/TomHolland.webp')},
    ],
  },
  amber: {
    favorites: [
      { id: 'a1', title: 'Romance', posterUrl: require('../../assets/posters/Genre/Romance/BeautyAndTheBeast.webp') },
    ],
    actors: [
      { id: 'aa1', name: 'Morgan Freeman', image: require('../../assets/actors/MorganFreeman.webp') },
    ],
  },
  isaiah: {
    favorites: [
      { id: 'i1', title: 'Action', posterUrl: require('../../assets/posters/Genre/Action/BloodHounds3.webp') },
    ],
    actors: [
      { id: 'ia1', name: 'Dylan Obrien', image: require('../../assets/actors/DylanObrien.webp') },
    ],
  },
} as const;

type Username = keyof typeof USERS;

export default function FriendProfilePage() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'picks' | 'lists'>('picks');

  const user = USERS[username as Username];
  const userData = USER_DATA[username as Username];

  if (!user) return (
    <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.text }}>User not found</Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Back button */}
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image source={user.profilePic} style={[styles.profilePic, { borderColor: theme.accent }]} />
        <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
        <Text style={[styles.userHandle, { color: theme.subtext }]}>{user.username}</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, { borderColor: theme.subtext }, activeTab === 'picks' && { borderColor: theme.accent, backgroundColor: '#1a0000' }]}
          onPress={() => setActiveTab('picks')}
        >
          <Text style={[styles.tabText, { color: theme.subtext }, activeTab === 'picks' && { color: theme.text }]}>
            Picks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, { borderColor: theme.subtext }, activeTab === 'lists' && { borderColor: theme.accent, backgroundColor: '#1a0000' }]}
          onPress={() => setActiveTab('lists')}
        >
          <Text style={[styles.tabText, { color: theme.subtext }, activeTab === 'lists' && { color: theme.text }]}>
            Lists
          </Text>
        </TouchableOpacity>
      </View>

      {/* Picks Tab */}
      {activeTab === 'picks' && (
        <View style={{ paddingHorizontal: 20 }}>

          {/* Favorites */}
          <View style={styles.sectionBlock}>
            <View style={styles.titleRow}>
              <Text style={[styles.sectionTitle, { color: theme.accent }]}>favorites</Text>
      
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -20 }}>
              {userData?.favorites.map(item => (
                <View key={item.id} style={styles.posterItem}>
                  <Image source={item.posterUrl} style={styles.posterImage} />
                  <Text style={[styles.itemLabel, { color: theme.text }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* My Actors */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { color: theme.accent }]}>actors</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -20 }}>
              {userData?.actors.map(actor => (
                <View key={actor.id} style={styles.actorItem}>
                  <Image source={actor.image} style={styles.actorImage} />
                  <Text style={[styles.itemLabel, { color: theme.text }]} numberOfLines={1}>
                    {actor.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* My Genres */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { color: theme.accent }]}>genres</Text>
            <Text style={[styles.emptyText, { color: theme.subtext }]}>Coming Soon!</Text>
          </View>

        </View>
      )}

      {/* Lists Tab */}
      {activeTab === 'lists' && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Lists</Text>
          <Text style={[styles.emptyText, { color: theme.subtext }]}>No lists yet</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingBottom: 8 },
  profileSection: { alignItems: 'center', marginBottom: 24, gap: 6 },
  profilePic: { borderWidth: 2, width: 90, height: 90, borderRadius: 50 },
  userName: { fontSize: 20, fontWeight: '600' },
  userHandle: { fontSize: 14 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginVertical: 20 },
  tab: { borderWidth: 1, width: '45%', height: 36, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tabText: { fontSize: 14 },
  sectionBlock: { marginBottom: 8 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    marginBottom: 24,
    textAlign: 'center',
  },
  posterItem: { width: 120, marginRight: 12 },
  posterImage: { width: 120, height: 150, borderRadius: 0 },
  actorItem: { width: 100, marginRight: 12, alignItems: 'center' },
  actorImage: { width: 100, height: 100, borderRadius: 50 },
  itemLabel: { fontSize: 12, marginTop: 5, textAlign: 'center', fontWeight: '900' },
});