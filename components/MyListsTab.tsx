import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserLists } from '../context/UserListContext';
import { ListConfig } from '../types';
import { useTheme } from '../context/ThemeContext';

function ListCover({ items, size = 160 }: { items: any[]; size?: number }) {
  const half = size / 2;
  const colors = ['#1a1a1a', '#2a2a2a', '#222', '#333'];
  return (
    <View style={{ width: size, height: size, flexDirection: 'row', flexWrap: 'wrap', borderRadius: 10, overflow: 'hidden' }}>
      {[0, 1, 2, 3].map(i => (
        <View key={i} style={{ width: half, height: half, backgroundColor: colors[i], alignItems: 'center', justifyContent: 'center' }}>
          {items[i] ? (
            <Image
              source={typeof items[i] === 'string' ? { uri: items[i] } : items[i]}
              style={{ width: half, height: half }}
            />
          ) : (
            <Ionicons name="film-outline" size={18} color="#555" />
          )}
        </View>
      ))}
    </View>
  );
}

export function MyListsTab() {
  const { lists, addList, removeList } = useUserLists();
  const { theme } = useTheme();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');

  const customLists = lists.filter(l => l.type === 'custom');

  const handleCreateLists = () => {
    if (!newListName.trim()) return;
    addList({
      id: Date.now().toString(),
      title: newListName.trim(),
      type: 'custom',
      order: lists.length,
      visibleOnHome: false,
      font: 'BebasNeue',
      items: [],
    });
    setNewListName('');
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: ListConfig | { id: string } }) => {
    if (item.id === 'add') {
      return (
        <View style={styles.listItemWrapper}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => setModalVisible(true)}
          >
            <View style={[styles.addCover, { backgroundColor: theme.surface }]}>
              <Ionicons name="add" size={40} color={theme.accent} />
            </View>
            <Text style={[styles.listItemTitle, { color: theme.subtext }]}>New List</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const list = item as ListConfig;
    return (
      <View style={styles.listItemWrapper}>
        {editMode && (
          <TouchableOpacity
            style={[styles.deleteCircle, { backgroundColor: theme.accent }]}
            onPress={() => removeList(list.id)}
          >
            <Ionicons name="remove" size={16} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => !editMode && router.push(`/list/${list.id}`)}
        >
          <ListCover items={list.items.map(i => i.posterUrl)} />
          <Text style={[styles.listItemTitle, { color: theme.text }]} numberOfLines={1}>
            {list.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.listsHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>My Lists</Text>
        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
          <Ionicons
            name={editMode ? 'checkmark' : 'pencil'}
            size={22}
            color={editMode ? theme.accent : theme.text}
          />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        data={[...customLists, { id: 'add' }] as any}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      {/* Create List Modal */}
      <Modal visible={modalVisible} transparent animationType='fade'>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>New List</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.subtext }]}
              placeholder='List name...'
              placeholderTextColor={theme.subtext}
              value={newListName}
              onChangeText={setNewListName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.cancelText, { color: theme.subtext }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateLists}>
                <Text style={[styles.createText, { color: theme.accent }]}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  listsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: { fontSize: 22, fontWeight: '600' },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 24 },
  listItemWrapper: {
    width: '47%',
    position: 'relative',
    paddingTop: 14,
  },
  listItem: { width: '100%' },
  addCover: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteCircle: {
    position: 'absolute',
    top: 2,
    left: -4,
    zIndex: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTitle: { fontSize: 13, marginTop: 6, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { borderRadius: 12, padding: 24, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  input: { borderWidth: 0.5, borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  cancelText: { fontSize: 16 },
  createText: { fontSize: 16, fontWeight: '600' },
});