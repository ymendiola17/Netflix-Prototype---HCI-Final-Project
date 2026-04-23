import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [tab, setTab] = useState<"cast" | "review">("cast");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const addComment = () => {
    if (comment.trim()) {
      setComments([comment, ...comments]);
      setComment("");
    }
  };

  const castList = [
    { id: "1", 
      name: "Leonardo DiCaprio",
      image: require("../assets/ProfilePictures/profIslam.jpg")  },
    { id: "2", 
      name: "Leonardo DiCaprio",
      image: require("../assets/ProfilePictures/yani.jpeg")  },
    { id: "3", 
      name: "Leonardo DiCaprio",
      image: require("../assets/ProfilePictures/amber.jpg")  },
  ];

  return (
    <View style={styles.container}>
      {/* TOP: Poster + Description */}
      <View style={styles.row}>
        <Image
          source={require("../assets/posters/MovieDescriptionPoster/Poster.jpg")}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>DragonBall Z</Text>

          <Text style={styles.description}>
            Dragon Ball Z (DBZ) is an iconic action-adventure anime series that 
            follows adult martial artist Son Goku as he and the Z Fighters defend 
            Earth from powerful extraterrestrial, 
            android, and cosmic villains. The series focuses on high-stakes combat, 
            constant training, character maturation, and protecting the world from devastation..
          </Text>
        </View>
      </View>

      {/* 🔥 DIVIDER ABOVE BUTTONS */}
      <View style={styles.divider} />

      {/* 🔘 TRANSPARENT TAB BUTTONS */}
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.tabButton, tab === "cast" && styles.activeTab]}
          onPress={() => setTab("cast")}
        >
          <Text style={styles.tabText}>Cast</Text>
        </Pressable>

        <Pressable
          style={[styles.tabButton, tab === "review" && styles.activeTab]}
          onPress={() => setTab("review")}
        >
          <Text style={styles.tabText}>Review</Text>
        </Pressable>
      </View>

      {/* 🔥 DIVIDER BELOW BUTTONS */}
      <View style={styles.divider} />

      {/* CONTENT */}
      <View style={styles.contentBox}>
        {tab === "cast" ? (
          <FlatList
            data={castList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.castItem}>
                <Image
                  source={require("../assets/ProfilePictures/profIslam.jpg")}
                  style={styles.avatar}
                />
                <Text style={styles.castName}>{item.name}</Text>
              </View>
            )}
          />
        ) : (
          <View>
            {/* Input */}
            <View style={styles.inputRow}>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Write a comment..."
                placeholderTextColor="#aaa"
                style={styles.input}
              />

              <Pressable style={styles.sendButton} onPress={addComment}>
                <Text style={styles.sendText}>Post</Text>
              </Pressable>
            </View>

            {/* Comments */}
            <FlatList
              data={comments}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentBox}>
                  <Text style={styles.commentText}>💬 {item}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  image: {
    width: 200,
    height: 320,
    borderRadius: 12,
    marginRight: 15,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  description: {
    color: "white",
    fontSize: 12,
  },

  /* 🔥 DIVIDER */
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 12,
  },

  /* 🔘 TRANSPARENT BUTTONS */
  buttonRow: {
    flexDirection: "row",
  },

  tabButton: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 transparent
    paddingVertical: 10,
    alignItems: "center",
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#e50914", // subtle highlight
  },

  tabText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  contentBox: {
    flex: 1,
    marginTop: 10,
  },

  /* CAST */
  castItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#333",
  },

  castName: {
    color: "white",
    fontSize: 14,
  },

  /* REVIEW */
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#e50914",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 6,
  },

  sendText: {
    color: "white",
    fontWeight: "bold",
  },

  commentBox: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },

  commentText: {
    color: "white",
    fontSize: 12,
  },
});