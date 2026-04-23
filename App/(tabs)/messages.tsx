import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  name: string;
  text: string;
  time: string;
  unread?: boolean;
  avatar: any;
};

type ChatMessage = {
  id: string;
  text: string;
  sender: 'me' | 'them';
};

export default function Page() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [myStatus, setMyStatus] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const statusUsers = [
    { name: 'You', status: myStatus, avatar: require('../../assets/ProfilePictures/profIslam.jpg'), isMe: true },
    { name: 'Kamy', status: 'Happy!', avatar: require('../../assets/ProfilePictures/kamy.jpg'), isMe: false },
    { name: 'Isaiah', status: 'Sad :(', avatar: require('../../assets/ProfilePictures/isaiah.jpg'), isMe: false },
    { name: 'Amber', status: 'Eh', avatar: require('../../assets/ProfilePictures/amber.jpg'), isMe: false },
    { name: 'Yani', status: 'ss3!!!', avatar: require('../../assets/ProfilePictures/yani.jpeg'), isMe: false },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', name: 'Yani', text: 'Hey! What movie are you watching?', time: '2m', unread: true, avatar: require('../../assets/ProfilePictures/yani.jpeg') },
    { id: '2', name: 'Kamy', text: 'Hi, how are you? Do you have any show recommendations?', time: '1h', unread: true, avatar: require('../../assets/ProfilePictures/kamy.jpg') },
    { id: '3', name: 'Isaiah', text: 'Hey, I see you are watching a movie. How do you like it?', time: '3h', avatar: require('../../assets/ProfilePictures/isaiah.jpg') },
    { id: '4', name: 'Amber', text: 'Hello! I just watched a great show. Want to chat about it?', time: '5h', avatar: require('../../assets/ProfilePictures/amber.jpg') },
  ]);

  const updateMyStatus = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt('Update Status', 'Your thoughts go here...', (val) => {
        setMyStatus(val || '');
      });
    } else {
      const text = prompt('Your thoughts go here...');
      if (text) setMyStatus(text);
    }
  };

  const sendMessage = () => {
    if (!replyText.trim()) return;
    setChatMessages((prev) => [...prev, { id: Date.now().toString(), text: replyText, sender: 'me' }]);
    setReplyText('');
  };

  const pickMovieFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'video/*', copyToCacheDirectory: true });
      if (!result.canceled) {
        const file = result.assets[0];
        setChatMessages((prev) => [...prev, { id: Date.now().toString(), text: `Movie uploaded: ${file.name}`, sender: 'me' }]);
      }
    } catch (err) {
      console.log('File pick error:', err);
    }
  };

  const openMessage = (msg: Message) => {
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m)));
    setSelectedMessage(msg);
    setChatMessages([{ id: 'init', text: msg.text, sender: 'them' }]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.background, paddingTop: insets.top }]}>
          {!selectedMessage ? (
            <Text style={[styles.headerTitle, { color: theme.text }]}>Status</Text>
          ) : (
            <View style={styles.chatHeader}>
              <TouchableOpacity
                onPress={() => { setSelectedMessage(null); setChatMessages([]); }}
                style={styles.backButtonContainer}
              >
                <Ionicons name="chevron-back" size={24} color={theme.accent} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, styles.chatTitle, { color: theme.text }]}>
                {selectedMessage.name}
              </Text>
              <View style={styles.headerSpacer} />
            </View>
          )}
        </View>

        {/* Status row */}
        {!selectedMessage && (
          <>
            <View style={styles.statusSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusScroll}>
                {statusUsers.map((user, index) => (
                  <View key={index} style={styles.statusWrapper}>

                    {user.isMe ? (
                      <TouchableOpacity
                        style={[styles.cloudBubble, { opacity: 1 }]}
                        onPress={updateMyStatus}
                      >
                        {myStatus.trim().length > 0 ? (
                          <Text style={styles.cloudText} numberOfLines={1}>{myStatus}</Text>
                        ) : (
                          <Text style={[styles.cloudText, { fontSize: 14, fontWeight: 'bold' }]}>+</Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <View style={[styles.cloudBubble, { opacity: user.status.trim().length > 0 ? 1 : 0 }]}>
                        <Text style={styles.cloudText} numberOfLines={1}>{user.status}</Text>
                      </View>
                    )}

                    <View style={[styles.statusCircle, { borderColor: theme.accent }]}>
                      <Image source={user.avatar} style={styles.statusAvatarImage} />
                    </View>

                    <Text style={[styles.statusName, { color: theme.subtext }]}>{user.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <Text style={[styles.subHeader, { color: theme.text }]}>My Messages</Text>
          </>
        )}

        {!selectedMessage ? (
          <ScrollView style={styles.inboxArea} keyboardShouldPersistTaps="handled">
            {messages.map((msg) => (
              <TouchableOpacity
                key={msg.id}
                style={[styles.msgRow, { borderColor: theme.surface }]}
                onPress={() => openMessage(msg)}
              >
                <View style={styles.msgAvatar}>
                  <Image source={msg.avatar} style={styles.avatarImage} />
                </View>
                <View style={styles.msgContent}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={[styles.msgName, { color: theme.text }]}>{msg.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.msgTime, { color: theme.subtext }]}>{msg.time}</Text>
                      {msg.unread && <View style={[styles.unreadBadge, { backgroundColor: theme.accent }]} />}
                    </View>
                  </View>
                  <Text style={[styles.msgSnippet, { color: theme.subtext }]} numberOfLines={1}>{msg.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.chatContainer}>
            <ScrollView
              style={styles.inboxArea}
              contentContainerStyle={{ padding: 10, flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              {chatMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={msg.sender === 'me'
                    ? [styles.outgoingBubble, { backgroundColor: theme.accent }]
                    : [styles.incomingBubble, { backgroundColor: theme.surface }]
                  }
                >
                  <Text style={[styles.messageText, { color: theme.text }]}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={[styles.inputBar, { borderTopColor: theme.surface, paddingBottom: insets.bottom + 14 }]}>
              <TouchableOpacity style={[styles.plusButton, { backgroundColor: theme.surface }]} onPress={pickMovieFile}>
                <Text style={[styles.plusText, { color: theme.text }]}>+</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { backgroundColor: theme.surface, color: theme.text }]}
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Message..."
                placeholderTextColor={theme.subtext}
              />
              <TouchableOpacity style={[styles.sendButtonContainer, { backgroundColor: theme.accent }]} onPress={sendMessage}>
                <Text style={styles.sendButton}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatContainer: { flex: 1, justifyContent: 'space-between', paddingBottom: Platform.OS === 'ios' ? 25 : 15 },
  header: { justifyContent: 'center', alignItems: 'center', padding: 10 },
  chatHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  backButtonContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerSpacer: {
    width: 40,
  },
  chatTitle: {
    flex: 1,
    textAlign: 'center',
  },
  backButton: { fontSize: 18 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  statusSection: { height: 155, paddingTop: 10, paddingBottom: 10 },
  statusScroll: { paddingHorizontal: 15, paddingBottom: 10 },
  statusWrapper: { alignItems: 'center', marginHorizontal: 12, width: 70, paddingBottom: 5 },
  statusCircle: { width: 70, height: 70, borderRadius: 75, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', overflow: 'hidden' },
  statusAvatarImage: { width: '100%', height: '100%' },
  statusName: { fontSize: 11, marginTop: 4 },
  cloudBubble: { backgroundColor: '#d0cccc', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15, marginBottom: 8, minHeight: 24, alignItems: 'center', justifyContent: 'center' },
  cloudText: { fontSize: 10 },
  subHeader: { fontSize: 25, fontWeight: 'bold', paddingHorizontal: 20, paddingVertical: 15 },
  inboxArea: { flex: 1 },
  msgRow: { flexDirection: 'row', padding: 15, borderBottomWidth: 0.5 },
  msgAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 15, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  msgContent: { flex: 1, justifyContent: 'center' },
  msgName: { fontWeight: 'bold' },
  msgTime: { fontSize: 12 },
  msgSnippet: { marginTop: 2, lineHeight: 18 },
  incomingBubble: { padding: 16, borderRadius: 18, marginVertical: 6, alignSelf: 'flex-start', maxWidth: '85%' },
  outgoingBubble: { padding: 16, borderRadius: 18, marginVertical: 6, alignSelf: 'flex-end', maxWidth: '85%' },
  messageText: { fontSize: 16 },
  inputBar: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 14, borderTopWidth: 1, alignItems: 'center', gap: 8 },
  input: { flex: 1, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16 },
  plusButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  plusText: { fontSize: 22, fontWeight: 'bold' },
  sendButtonContainer: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  sendButton: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  unreadBadge: { width: 10, height: 10, borderRadius: 5, marginLeft: 8 },
});