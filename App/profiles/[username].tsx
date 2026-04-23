import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const USERS = {
  yani: {
    name: 'Yanish',
    username: '@ya._.nim',
    profilePic: require('../../assets/ProfilePictures/yani.jpeg'),
  },
  kamy: {
    name: 'Kamy',
    username: '@kamyy15',
    profilePic: require('../../assets/ProfilePictures/profIslam.jpg'),
  },
  amber: {
    name: 'Amber',
    username: '@ambster',
    profilePic: require('../../assets/ProfilePictures/amber.jpg'),
  },
  isaiah: {
    name: 'Isai',
    username: '@theblackblur',
    profilePic: require('../../assets/ProfilePictures/profIslam.jpg'),
  },
} as const;

type Username = keyof typeof USERS;

export default function FriendProfilePage() {
  const { username } = useLocalSearchParams<{ username: string }>();
  console.log('username param: ', username);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'picks' | 'lists'>('picks');

  const user = USERS[username as Username];

  if (!user) return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>User not found</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* Back button */}
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image source={user.profilePic} style={styles.profilePic} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userHandle}>{user.username}</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'picks' && styles.activeTab]}
          onPress={() => setActiveTab('picks')}
        >
          <Text style={[styles.tabText, activeTab === 'picks' && styles.activeTabText]}>
            Picks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lists' && styles.activeTab]}
          onPress={() => setActiveTab('lists')}
        >
          <Text style={[styles.tabText, activeTab === 'lists' && styles.activeTabText]}>
            Lists
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'picks' && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <Text style={styles.sectionTitle}>Actors</Text>
          <Text style={styles.sectionTitle}>Genres</Text>
        </View>
      )}

      {activeTab === 'lists' && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.listTitle}>Lists</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topBar: { paddingHorizontal: 16, paddingBottom: 8 },
  profileSection: { alignItems: 'center', marginBottom: 24, gap: 6 },
  profilePic: { borderWidth: 2, borderColor: '#E50914', width: 90, height: 90, borderRadius: 50 },
  userName: { color: 'white', fontSize: 20, fontWeight: '600' },
  userHandle: { color: '#888', fontSize: 14 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginVertical: 20 },
  tab: { borderWidth: 1, borderColor: '#555', width: '45%', height: 36, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  activeTab: { borderColor: '#E50914', backgroundColor: '#1a0000' },
  tabText: { color: '#888', fontSize: 14 },
  activeTabText: { color: 'white', fontWeight: '600' },
  sectionTitle: { color: '#c72c34', fontSize: 45, fontWeight: '900', marginBottom: 16, textAlign: 'center' },
  listTitle: { color: 'white', fontSize: 22, fontWeight: '600', marginBottom: 16},
});