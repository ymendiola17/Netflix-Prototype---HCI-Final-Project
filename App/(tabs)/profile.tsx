import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUserLists } from '../../context/UserListContext';
import { MyListsTab } from '../../components/MyListsTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const { lists, addList, favorites, removeFavorite, actors, removeActor } = useUserLists();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'picks' | 'lists'>('picks');
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const insets = useSafeAreaInsets();

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    addList({
      id: Date.now().toString(),
      title: newListName.trim(),
      type: 'custom',
      font: 'BebasNeue',
      order: lists.length,
      visibleOnHome: false,
      items: [],
    });
    setNewListName('');
    setModalVisible(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Gear Icon */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Link href="/settings" asChild>
          <TouchableOpacity>
            <Ionicons name='settings-outline' size={28} color={theme.text} />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          style={[styles.profilePic, { borderColor: theme.accent }]}
          source={require('../../assets/ProfilePictures/profIslam.jpg')}
        />
        <Text style={[styles.name, { color: theme.text }]}>Islam</Text>
        <Text style={[styles.userName, { color: theme.subtext }]}>@HCI_professor</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, { borderColor: theme.subtext }, activeTab === 'picks' && { borderColor: theme.accent, backgroundColor: '#1a0000' }]}
          onPress={() => setActiveTab('picks')}
        >
          <Text style={[styles.tabText, { color: theme.subtext }, activeTab === 'picks' && { color: theme.text }]}>
            My Picks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, { borderColor: theme.subtext }, activeTab === 'lists' && { borderColor: theme.accent, backgroundColor: '#1a0000' }]}
          onPress={() => setActiveTab('lists')}
        >
          <Text style={[styles.tabText, { color: theme.subtext }, activeTab === 'lists' && { color: theme.text }]}>
            My Lists
          </Text>
        </TouchableOpacity>
      </View>

      {/* My Picks Tab */}
      {activeTab === 'picks' && (
        <View style={{ paddingHorizontal: 20 }}>

          {/* Favorites */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { color: theme.accent }]}>favorites</Text>
            {favorites.length === 0 ? (
              <Text style={[styles.emptyText, { color: theme.subtext }]}>
                Star a show or movie to add it here
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -20 }}>
                {favorites.map(item => (
                  <View key={item.id} style={styles.posterItem}>
                    <Image
                      source={typeof item.posterUrl === 'string' ? { uri: item.posterUrl } : item.posterUrl}
                      style={styles.posterImage}
                    />
                    <Text style={[styles.itemLabel, { color: theme.text }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* My Actors */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { color: theme.accent }]}>my actors</Text>
            {actors.length === 0 ? (
              <Text style={[styles.emptyText, { color: theme.subtext }]}>
                Add actors from a show or movie's cast
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -20 }}>
                {actors.map(actor => (
                  <View key={actor.id} style={styles.actorItem}>
                    <Image
                      source={actor.image}
                      style={styles.actorImage}
                    />
                    <Text style={[styles.itemLabel, { color: theme.text }]} numberOfLines={1}>
                      {actor.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* My Genres */}
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { color: theme.accent }]}>my genres</Text>
            <Text style={[styles.emptyText, { color: theme.subtext }]}>
              Coming Soon!
            </Text>
          </View>

        </View>
      )}

      {/* My Lists Tab */}
      {activeTab === 'lists' && <MyListsTab />}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>New List</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.subtext }]}
              placeholder="List name..."
              placeholderTextColor={theme.subtext}
              value={newListName}
              onChangeText={setNewListName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.cancelText, { color: theme.subtext }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateList}>
                <Text style={[styles.createText, { color: theme.accent }]}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0 },
  header: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  profilePic: { borderWidth: 2, width: 90, height: 90, borderRadius: 50 },
  name: { fontSize: 20, marginTop: 10 },
  userName: { fontSize: 15, marginTop: 5 },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  tab: {
    borderWidth: 1,
    width: '45%',
    height: 36,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: { fontSize: 14 },
  sectionBlock: { marginBottom: 8 },
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
  posterItem: {
    width: 120,
    marginRight: 12,
  },
  posterImage: {
    width: 120,
    height: 150,
    borderRadius: 0,
  },
  actorItem: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  actorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  itemLabel: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '900',
  },
  moreBox: {
    position: 'absolute',
    width: 65,
    height: 95,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 0.5,
  },
  listName: { fontSize: 16 },
  listActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  homeToggle: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  createButtonText: { fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { borderRadius: 12, padding: 24, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  input: { borderWidth: 0.5, borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  cancelText: { fontSize: 16 },
  createText: { fontSize: 16, fontWeight: '600' },
});