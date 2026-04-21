import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUserLists } from '../../context/UserListContext';

export default function ProfileScreen() {
  const { lists, addList, removeList, toggleHomeVisibility } = useUserLists();
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    addList({
      id: Date.now().toString(),
      title: newListName.trim(),
      type: 'custom',
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
        <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
          <Ionicons name='settings-outline' size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image style={styles.profilePic} />
        <Text style={styles.userName}>Username</Text>
      </View>

      {/* My Lists section */}
      <Text style={styles.sectionTitle}>My Lists</Text>

      {lists.filter(l => l.type === 'custom').map(list => (
        <View key={list.id} style={styles.listRow}>
          <Text style={styles.listName}>{list.title}</Text>
          <View style={styles.listActions}>
            {/* Toggle whether it shows on home */}
            <TouchableOpacity
              style={[styles.homeToggle, list.visibleOnHome && styles.homeToggleActive]}
              onPress={() => toggleHomeVisibility(list.id)}
            >
              <Text style={styles.homeToggleText}>
                {list.visibleOnHome ? 'On Home' : 'Add to Home'}
              </Text>
            </TouchableOpacity>
            {/* Delete list */}
            <TouchableOpacity onPress={() => removeList(list.id)}>
              <Ionicons name="trash-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Create new list button */}
      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={20} color="#E50914" />
        <Text style={styles.createButtonText}>Create New List</Text>
      </TouchableOpacity>

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
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 30 },
  profilePic: { borderWidth: 2, borderColor: '#E50914', width: 90, height: 90, borderRadius: 50 },
  userName: { color: 'white', fontSize: 20, marginTop: 10 },
  sectionTitle: { color: 'white', fontSize: 22, fontWeight: '600', marginBottom: 16 },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
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
  homeToggleActive: {
    borderColor: '#E50914',
    backgroundColor: '#1a0000',
  },
  homeToggleText: { color: 'white', fontSize: 12 },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
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