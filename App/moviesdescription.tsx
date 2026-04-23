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
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';

export default function MovieDescription() {
  const [tab, setTab] = useState<"cast" | "review">("cast");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const router = useRouter();

  const addComment = () => {
    if (comment.trim()) {
      setComments([comment, ...comments]);
      setComment("");
    }
  };

  const castList = [
    { id: "1", name: "Leonardo DiCaprio", image: require("../assets/ProfilePictures/profIslam.jpg") },
    { id: "2", name: "Yani", image: require("../assets/ProfilePictures/yani.jpeg") },
    { id: "3", name: "Amber", image: require("../assets/ProfilePictures/amber.jpg") },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Full width poster with back button overlaid */}
      <View>
        <Image
          source={require("../assets/posters/MovieDescriptionPoster/Poster.jpg")}
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
        <Text style={[styles.title, { color: theme.text }]}>DragonBall Z</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: theme.subtext }]}>2024</Text>
          <Text style={[styles.metaDot, { color: theme.subtext }]}>·</Text>
          <Text style={[styles.metaText, { color: theme.subtext }]}>TV-14</Text>
          <Text style={[styles.metaDot, { color: theme.subtext }]}>·</Text>
          <Text style={[styles.metaText, { color: theme.subtext }]}>3 Seasons</Text>
        </View>
        <Text style={[styles.description, { color: theme.subtext }]}>
          Dragon Ball Z follows adult martial artist Son Goku as he and the Z Fighters
          defend Earth from powerful extraterrestrial villains.
        </Text>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={18} color="black" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.surface }]}>
            <Ionicons name="add" size={22} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.surface }]}>
            <Ionicons name="star-outline" size={22} color={theme.text} />
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
            renderItem={({ item }) => (
              <View style={styles.castItem}>
                <Image source={item.image} style={styles.avatar} />
                <Text style={[styles.castName, { color: theme.text }]}>{item.name}</Text>
              </View>
            )}
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
              <Pressable style={[styles.sendButton, { backgroundColor: theme.accent }]} onPress={addComment}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 320 },
  backButton: {
    position: 'absolute',
    top: 0,
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
  avatar: { width: 70, height: 70, borderRadius: 20, marginRight: 10, backgroundColor: '#333' },
  castName: { fontSize: 14 },
  inputRow: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, padding: 10, borderRadius: 6, marginRight: 10 },
  sendButton: { paddingHorizontal: 15, justifyContent: 'center', borderRadius: 6 },
  sendText: { color: 'white', fontWeight: 'bold' },
  commentBox: { padding: 10, borderRadius: 6, marginBottom: 8 },
  commentText: { fontSize: 12 },
});