import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUserLists } from '../../context/UserListContext';
import { MyListsTab } from '../../components/MyListsTab';
import { useRouter } from 'expo-router';


export default function ProfileScreen() {
  const { lists, addList, removeList, toggleHomeVisibility, toggleFavorite, removeItemFromList } = useUserLists();
  const [activeTab, setActiveTab] = useState<'picks' | 'lists'>('picks');
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const router = useRouter();

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    addList({
      id: Date.now().toString(),
      title: newListName.trim(),
      type: 'custom',
      font: 'BebasNeue',
      order: lists.length,
      visibleOnHome: false,  // off by default, user toggles it on
      items: [],
    });
    setNewListName('');
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>

      {/* Gear Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name='settings-outline' size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image 
        style={styles.profilePic} 
        source={require('../../assets/ProfilePictures/profIslam.jpg')}
        />
        <Text style={styles.name}>Islam</Text>
        <Text style={styles.userName}>@best_professor</Text>
      </View>


      {/*Tab Buttons*/}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'picks' && styles.activeTab]}
          onPress={() => setActiveTab('picks')}
        >
          <Text style={[styles.tabText, activeTab === 'picks' && styles.activeTabText]}>
            My Picks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lists' && styles.activeTab]}
          onPress={() => setActiveTab('lists')}
        >
          <Text style={[styles.tabText, activeTab === 'lists' && styles.activeTabText]}>
            My Lists
          </Text>
        </TouchableOpacity>
      </View>

      {/* My Picks Tab */}
      {activeTab === 'picks' && (
        <View>
          <Text style={styles.sectionTitle}>favorites</Text>
          {/* favorites content here */}

          <Text style={styles.sectionTitle}>my actors</Text>
          {/* actors content here */}

          <Text style={styles.sectionTitle}>my genres</Text>
          {/* genres content here */}
        </View>
      )}

      {/* My Lists Tab */}
      {activeTab === 'lists' && <MyListsTab />}
        
      {/* Modal for naming the new list */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>New List</Text>
            <TextInput
              style={styles.input}
              placeholder="List name..."
              placeholderTextColor="#888"
              value={newListName}
              onChangeText={setNewListName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateList}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 0 },
  header: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  profilePic: { borderWidth: 2, borderColor: '#E50914', width: 90, height: 90, borderRadius: 50 },
  name: { color: 'white', fontSize: 20, marginTop: 10 },
  userName: { color: 'grey', fontSize: 15, marginTop: 5 },
  sectionTitle: { color: '#c72c34', fontSize: 45, fontWeight: '900', marginBottom: 16, textAlign: 'center' },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 0.5,
    borderColor: '#222',
  },
  tabRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  marginVertical: 20,
  padding: 20,
},
  tab: {
  borderWidth: 1,
  borderColor: '#555',
  width: '45%',
  height: 36,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  },
  activeTab: {
    borderColor: '#E50914',
    backgroundColor: '#1a0000',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  
    listName: { color: 'white', fontSize: 16 },
    listActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    homeToggle: {
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 4,
  },
  createButtonText: { color: '#E50914', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 24,
    width: '80%',
  },
  modalTitle: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  input: {
    borderWidth: 0.5,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  cancelText: { color: '#888', fontSize: 16 },
  createText: { color: '#E50914', fontSize: 16, fontWeight: '600' },
});