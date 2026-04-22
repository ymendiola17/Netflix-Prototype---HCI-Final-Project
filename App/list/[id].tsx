import { View, Text, ScrollView, TouchableOpacity, 
         Image, StyleSheet, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUserLists } from '../../context/UserListContext';

function ListCover({ items, size = 160 }: { items: string[]; size?: number }) {
  const half = size / 2;
  const colors = ['#1a1a1a', '#2a2a2a', '#222', '#333'];
  return (
    <View style={{ width: size, height: size, flexDirection: 'row', flexWrap: 'wrap', borderRadius: 12, overflow: 'hidden' }}>
      {[0, 1, 2, 3].map(i => (
        <View key={i} style={{ width: half, height: half, backgroundColor: colors[i], alignItems: 'center', justifyContent: 'center' }}>
          {items[i] ? (
            <Image source={{ uri: items[i] }} style={{ width: half, height: half }} />
          ) : (
            <Ionicons name="film-outline" size={20} color="#555" />
          )}
        </View>
      ))}
    </View>
  );
}

export default function ListPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { lists, toggleFavorite, removeItemFromList, removeList } = useUserLists();
  const router = useRouter();

  const [itemModal, setItemModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [listModal, setListModal] = useState(false);

  const list = lists.find(l => l.id === id);

  // ↓ define these before the early return
  const openItemModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setItemModal(true);
  };

  const handleRemoveItem = () => {
    if (selectedItemId && list) removeItemFromList(list.id, selectedItemId);
    setItemModal(false);
  };

  const handleDeleteList = () => {
    if (list) removeList(list.id);
    setListModal(false);
    router.back();
  };

  // ↓ early return goes last
  if (!list) return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>List not found</Text>
    </View>
  );
  
    return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* List settings button (top right) */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setListModal(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Cover + title */}
      <View style={styles.coverSection}>
        <ListCover items={list.items.map(i => i.posterUrl)} size={160} />
        <Text style={styles.listTitle}>{list.title}</Text>
        <Text style={styles.itemCount}>{list.items.length} titles</Text>
      </View>

      {/* Play / Shuffle buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={16} color="black" />
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shuffleButton}>
          <Ionicons name="shuffle" size={16} color="white" />
          <Text style={styles.shuffleText}>Shuffle</Text>
        </TouchableOpacity>
      </View>

      {/* Items */}
      {list.items.map(item => (
        <View key={item.id} style={styles.itemRow}>
          {/* Poster */}
          <View style={styles.poster}>
            <Ionicons name="film-outline" size={20} color="#555" />
          </View>
          {/* Title */}
          <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
          {/* Actions */}
          <View style={styles.itemActions}>
            <TouchableOpacity onPress={() => toggleFavorite(list.id, item.id)}>
              <Ionicons
                name={item.isFavorited ? 'star' : 'star-outline'}
                size={22}
                color={item.isFavorited ? '#E50914' : '#888'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-circle-outline" size={22} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openItemModal(item.id)}>
              <Ionicons name="ellipsis-vertical" size={22} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Item settings modal */}
      <Modal visible={itemModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setItemModal(false)}>
          <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.sheetRow}>
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.sheetText}>Play</Text>
            </TouchableOpacity>
            <View style={styles.sheetDivider} />
            <TouchableOpacity style={styles.sheetRow} onPress={handleRemoveItem}>
              <Ionicons name="trash-outline" size={20} color="#E50914" />
              <Text style={[styles.sheetText, { color: '#E50914' }]}>Remove from list</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* List settings modal */}
      <Modal visible={listModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setListModal(false)}>
          <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.sheetRow}>
              <Ionicons name="pencil-outline" size={20} color="white" />
              <Text style={styles.sheetText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.sheetDivider} />
            <TouchableOpacity style={styles.sheetRow}>
              <Ionicons name="people-outline" size={20} color="white" />
              <Text style={styles.sheetText}>Start Collab</Text>
            </TouchableOpacity>
            <View style={styles.sheetDivider} />
            <TouchableOpacity style={styles.sheetRow} onPress={handleDeleteList}>
              <Ionicons name="trash-outline" size={20} color="#E50914" />
              <Text style={[styles.sheetText, { color: '#E50914' }]}>Delete from Library</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 10,
  },
  coverSection: { alignItems: 'center', marginBottom: 24, gap: 10 },
  listTitle: { color: 'white', fontSize: 22, fontWeight: '700' },
  itemCount: { color: '#888', fontSize: 14 },
  actionRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 28 },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 6,
  },
  playText: { color: 'black', fontWeight: '600', fontSize: 15 },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 6,
  },
  shuffleText: { color: 'white', fontWeight: '600', fontSize: 15 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
    gap: 12,
  },
  poster: {
    width: 56,
    height: 80,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: { color: 'white', fontSize: 14, flex: 1 },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  bottomSheet: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 36,
  },
  sheetRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  sheetText: { color: 'white', fontSize: 16 },
  sheetDivider: { height: 0.5, backgroundColor: '#333' },
});
