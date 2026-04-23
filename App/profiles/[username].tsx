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

type Username = keyof typeof USERS;

export default function FriendProfilePage() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'picks' | 'lists'>('picks');

  const user = USERS[username as Username];

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

      {activeTab === 'picks' && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Favorites</Text>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Actors</Text>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Genres</Text>
        </View>
      )}

      {activeTab === 'lists' && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.listTitle, { color: theme.text }]}>Lists</Text>
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
  sectionTitle: { fontSize: 45, fontWeight: '900', marginBottom: 16, textAlign: 'center' },
  listTitle: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
});