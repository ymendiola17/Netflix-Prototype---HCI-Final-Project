import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUserLists } from '../context/UserListContext';

export default function MovieDescription() {
  const [tab, setTab] = useState<"cast" | "review">("cast");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [listModalVisible, setListModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const router = useRouter();
  const { lists, favorites, actors, addFavorite, removeFavorite, addItemToList, addActor, removeActor } = useUserLists();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();

  const currentItem = lists.flatMap(l => l.items).find(i => i.id === itemId);
  const isFavorited = favorites.some(f => f.id === currentItem?.id);

  const addComment = () => {
    if (comment.trim()) {
      setComments([comment, ...comments]);
      setComment("");
    }
  };

  const handleFavorite = () => {
    if (!currentItem) return;
    if (isFavorited) {
      removeFavorite(currentItem.id);
    } else {
      addFavorite(currentItem);
    }
  };

  const handleAddToList = (listId: string) => {
    if (!currentItem) return;
    addItemToList(listId, currentItem);
    setListModalVisible(false);
  };

  const castList = [
    { id: "1", name: "Adam Sandler", image: require("../assets/actors/AdamSandler.webp") },
    { id: "2", name: "Anne Hathaway", image: require("../assets/actors/AnneHathaway.webp") },
    { id: "3", name: "Dylan Obrien", image: require("../assets/actors/DylanObrien.webp") },
    { id: "4", name: "Jackie Chan", image: require("../assets/actors/JackieChan.webp") },
    { id: "5", name: "Morgan Freeman", image: require("../assets/actors/MorganFreeman.webp") },
  ];

  if (!currentItem) return (
    <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', top: insets.top + 8, left: 12 }}
      >
        <Ionicons name="chevron-back" size={28} color={theme.text} />
      </TouchableOpacity>
      <Text style={{ color: theme.text }}>Item not found</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Full width poster with back button overlaid */}
      <View>
        <Image
          source={typeof currentItem.posterUrl === 'string' ? { uri: currentItem.posterUrl } : currentItem.posterUrl}
          style={styles.image}
        />
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + 8 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Title + info */}
      <View style={styles.infoSection}>
        <Text style={[styles.title, { color: theme.text }]}>{currentItem.title}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: theme.subtext }]}>2024</Text>
          <Text style={[styles.metaDot, { color: theme.subtext }]}>·</Text>
          <Text style={[styles.metaText, { color: theme.subtext }]}>TV-14</Text>
          <Text style={[styles.metaDot, { color: theme.subtext }]}>·</Text>
          <Text style={[styles.metaText, { color: theme.subtext }]}>
            {currentItem.type === 'show' ? 'TV Show' : 'Movie'}
          </Text>
        </View>
        <Text style={[styles.description, { color: theme.subtext }]}>
          {currentItem.genre} · Tap play to watch
        </Text>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={18} color="black" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.surface }]}
            onPress={() => setListModalVisible(true)}
          >
            <Ionicons name="add" size={22} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.surface }]}
            onPress={handleFavorite}
          >
            <Ionicons
              name={isFavorited ? 'star' : 'star-outline'}
              size={22}
              color={isFavorited ? theme.accent : theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Tab buttons */}
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.tabButton, tab === "cast" && { borderBottomWidth: 2, borderBottomColor: theme.accent }]}
          onPress={() => setTab("cast")}
        >
          <Text style={[styles.tabText, { color: theme.text }]}>Cast</Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, tab === "review" && { borderBottomWidth: 2, borderBottomColor: theme.accent }]}
          onPress={() => setTab("review")}
        >
          <Text style={[styles.tabText, { color: theme.text }]}>Review</Text>
        </Pressable>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Content */}
      <View style={styles.contentBox}>
        {tab === "cast" ? (
          <FlatList
            data={castList}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const isAdded = actors.some(a => a.id === item.id);
              return (
                <View style={styles.castItem}>
                  <Image source={item.image} style={styles.avatar} />
                  <Text style={[styles.castName, { color: theme.text }]}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (isAdded) {
                        removeActor(item.id);
                      } else {
                        addActor({ id: item.id, name: item.name, image: item.image });
                      }
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    <Ionicons
                      name={isAdded ? 'star' : 'star-outline'}
                      size={24}
                      color={isAdded ? theme.accent : theme.subtext}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <View>
            <View style={styles.inputRow}>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Write a comment..."
                placeholderTextColor={theme.subtext}
                style={[styles.input, { backgroundColor: theme.surface, color: theme.text }]}
              />
              <Pressable
                style={[styles.sendButton, { backgroundColor: theme.accent }]}
                onPress={addComment}
              >
                <Text style={styles.sendText}>Post</Text>
              </Pressable>
            </View>
            <FlatList
              data={comments}
              keyExtractor={(_, i) => i.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={[styles.commentBox, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.commentText, { color: theme.text }]}>💬 {item}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>

      {/* Add to list modal */}
      <Modal visible={listModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setListModalVisible(false)}
        >
          <View style={[styles.bottomSheet, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Add to List</Text>
            {lists.filter(l => l.type === 'custom').map(list => (
              <TouchableOpacity
                key={list.id}
                style={[styles.listOption, { borderBottomColor: theme.background }]}
                onPress={() => handleAddToList(list.id)}
              >
                <Text style={[styles.listOptionText, { color: theme.text }]}>{list.title}</Text>
                <Ionicons name="chevron-forward" size={18} color={theme.subtext} />
              </TouchableOpacity>
            ))}
            {lists.filter(l => l.type === 'custom').length === 0 && (
              <Text style={[styles.emptyText, { color: theme.subtext }]}>
                No lists yet — create one in your profile
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 320 },
  backButton: {
    position: 'absolute',
    left: 12,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
  },
  infoSection: { padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 6 },
  metaText: { fontSize: 13 },
  metaDot: { fontSize: 13 },
  description: { fontSize: 13, lineHeight: 20, marginBottom: 16 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  playButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'white', paddingHorizontal: 32, paddingVertical: 10, borderRadius: 6, flex: 1, justifyContent: 'center' },
  playText: { color: 'black', fontWeight: '700', fontSize: 15 },
  addButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 12 },
  buttonRow: { flexDirection: 'row' },
  tabButton: { flex: 1, backgroundColor: 'transparent', paddingVertical: 10, alignItems: 'center' },
  tabText: { fontSize: 14, fontWeight: 'bold' },
  contentBox: { flex: 1, marginTop: 10, paddingHorizontal: 20, paddingBottom: 40 },
  castItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 70, height: 70, borderRadius: 8, marginRight: 10, backgroundColor: '#333' },
  castName: { fontSize: 14, flex: 1 },
  inputRow: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, padding: 10, borderRadius: 6, marginRight: 10 },
  sendButton: { paddingHorizontal: 15, justifyContent: 'center', borderRadius: 6 },
  sendText: { color: 'white', fontWeight: 'bold' },
  commentBox: { padding: 10, borderRadius: 6, marginBottom: 8 },
  commentText: { fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  bottomSheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, paddingBottom: 40 },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  listOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 0.5 },
  listOptionText: { fontSize: 16 },
  emptyText: { fontSize: 14, textAlign: 'center', paddingVertical: 20 },
});