import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserLists } from '../context/UserListContext';
import { ListConfig } from '../types';
import { Dimensions } from 'react-native';

// --- List Cover: 4-Quadrant Grid ---
function ListCover({ items, size = 195 }: { items: any[]; size?: number }) {
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

// --- My Lists Tab ---
export function MyListsTab() {
    const { lists, addList, removeList } = useUserLists();
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

    const renderItem = ({ item }: { item: ListConfig }) => (
        <TouchableOpacity
        style={styles.listItem}
        onPress={() => !editMode && router.push(`/list/${item.id}`)}
        >
            {editMode && (
                <TouchableOpacity style={styles.deleteCircle} onPress={() => removeList(item.id)}>
                    <Ionicons name="remove" size={16} color="white" />
                </TouchableOpacity>
            )}
            <ListCover items={item.items.map(i => i.posterUrl)} />
            <Text style={styles.listItemTitle} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.listsHeader}>
                <Text style={styles.sectionTitle}>My Lists</Text>
                <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                    <Ionicons
                    name={editMode ? 'checkmark' : 'pencil'}
                    size={22}
                    color={editMode ? '#E50914' : 'white'}
                    />
                </TouchableOpacity>
            </View>

            {/* Grid */}
            <FlatList
                data={customLists}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                scrollEnabled={true}
            />

            {/* Add Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle" size={44} color='#E50914' />
            </TouchableOpacity>

            {/* Create List Modal */}
            <Modal visible={modalVisible} transparent animationType='fade'>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>New List</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='List name...'
                            placeholderTextColor='#888'
                            value={newListName}
                            onChangeText={setNewListName}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCreateLists}>
                                <Text style={styles.createText}>Create</Text>
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
        paddingLeft: 20,
        paddingRight: 20,
    },
    sectionTitle: { color: 'white', fontSize: 22, fontWeight: '600' },
    columnWrapper: { justifyContent: 'flex-start', gap: 12, marginBottom: 24 },
    listItem: { width: '47%', position: 'relative', paddingTop: 12 },
    deleteCircle: {
        position: 'absolute',
        top: -8,
        left: -8,
        zIndex: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E50914',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemTitle: { color: 'white', fontSize: 13, marginTop: 6, textAlign: 'center'},
    addButton: { alignItems: 'center', marginTop: 8, marginBottom: 24 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center'},
    modalBox: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 24, width: '80%' },
    modalTitle: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 16},
    input: { borderWidth: 0.5, borderColor: '#555', borderRadius: 8, padding: 10, color: 'white', fontSize: 16, marginBottom: 20},
    modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
    cancelText: { color: '#888', fontSize: 16 },
    createText: { color: '#E50914', fontSize: 16, fontWeight: '600'},
});