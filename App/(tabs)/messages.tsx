import React, { useState } from 'react';
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
import {useFonts,Roboto_500Medium_Italic,} from '@expo-google-fonts/roboto';

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

  const [myStatus, setMyStatus] = useState(' ');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const statusUsers = [
    {
      name: 'You',
      status: myStatus,
      avatar: require('../../assets/ProfilePictures/yani.jpeg'),
    },
    {
      name: 'Kamy',
      status: 'Happy!',
      avatar: require('../../assets/ProfilePictures/kamy.jpg'),
    },
    {
      name: 'Isaiah',
      status: 'Sad :(',
      avatar: require('../../assets/ProfilePictures/isaiah.jpg'),
    },
    {
      name: 'Amber',
      status: 'Eh',
      avatar: require('../../assets/ProfilePictures/amber.jpg'),
  
    },
    {
      name: 'Yani',
      status: 'ss3!!!',
      avatar: require('../../assets/ProfilePictures/yani.jpeg'),
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'Yani',
      text: 'Hey! What movie are you watching?',
      time: '2m',
      unread: true,
      avatar: require('../../assets/ProfilePictures/yani.jpeg'),
    },
    {
      id: '2',
      name: 'Kamy',
      text: 'Hi, how are you? Do you have any show recommendations?',
      time: '1h',
      unread: true,
      avatar: require('../../assets/ProfilePictures/kamy.jpg'),
    },
    {
      id: '3',
      name: 'Isaiah',
      text: 'Hey, I see you are watching a movie. How do you like it?',
      time: '3h',
      avatar: require('../../assets/ProfilePictures/isaiah.jpg'),
    },
    {
      id: '4',
      name: 'Amber',
      text: 'Hello! I just watched a great show. Want to chat about it?',
      time: '5h',
      avatar: require('../../assets/ProfilePictures/amber.jpg'),
    },
  ]);

  const updateMyStatus = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt('Update Status', 'Your thoughts go here...', (val) => {
        setMyStatus(val || ' ');
      });
    } else {
      const text = prompt('Your thoughts go here...');
      if (text) setMyStatus(text);
    }
  };

  const sendMessage = () => {
    if (!replyText.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: replyText,
        sender: 'me',
      },
    ]);

    setReplyText('');
  };

  const pickMovieFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];

        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: `Movie uploaded: ${file.name}`,
            sender: 'me',
          },
        ]);
      }
    } catch (err) {
      console.log('File pick error:', err);
    }
  };

  const openMessage = (msg: Message) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m))
    );

    setSelectedMessage(msg);
    setChatMessages([{ id: 'init', text: msg.text, sender: 'them' }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          {!selectedMessage ? (
            <Text style={styles.headerTitle}>Status</Text>
          ) : (
            <View style={styles.chatHeader}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedMessage(null);
                  setChatMessages([]);
                }}
                style={styles.backButtonContainer}
              >
                <Text style={styles.backButton}>{'< Back'}</Text>
              </TouchableOpacity>

              <Text style={styles.headerTitle}>{selectedMessage.name}</Text>
            </View>
          )}
        </View>

        {!selectedMessage && (
          <>
            <View style={styles.statusSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.statusScroll}
              >
                {statusUsers.map((user, index) => (
                  <View key={index} style={styles.statusWrapper}>
                    <View
                      style={[
                        styles.cloudBubble,
                        { opacity: user.status.trim().length > 0 ? 1 : 0 },
                      ]}
                    >
                      <Text style={styles.cloudText} numberOfLines={1}>
                        {user.status}
                      </Text>
                      <View style={styles.cloudTail} />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.statusCircle,
                        { borderColor: getBorderColor(index) },
                      ]}
                      onPress={index === 0 ? updateMyStatus : undefined}
                    >
                      {index === 0 && user.status.trim().length === 0 ? (
                        <Text style={{ fontSize: 24 }}>+</Text>
                      ) : (
                        <Image
                          source={user.avatar}
                          style={styles.statusAvatarImage}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.subHeader}>My Messages</Text>
          </>
        )}

        {!selectedMessage ? (
          <ScrollView
            style={styles.inboxArea}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg) => (
              <TouchableOpacity
                key={msg.id}
                style={styles.msgRow}
                onPress={() => openMessage(msg)}
              >
                <View style={styles.msgAvatar}>
                  <Image source={msg.avatar} style={styles.avatarImage} />
                </View>

                <View style={styles.msgContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <Text style={styles.msgName}>{msg.name}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.msgTime}>{msg.time}</Text>
                      {msg.unread && <View style={styles.unreadBadge} />}
                    </View>
                  </View>

                  <Text style={styles.msgSnippet} numberOfLines={1}>
                    {msg.text}
                  </Text>
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
                  style={
                    msg.sender === 'me'
                      ? styles.outgoingBubble
                      : styles.incomingBubble
                  }
                >
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputBar}>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={pickMovieFile}
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Message..."
                placeholderTextColor="#aaa"
              />

              <TouchableOpacity
                style={styles.sendButtonContainer}
                onPress={sendMessage}
              >
                <Text style={styles.sendButton}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getBorderColor = (index: number) => {
  const colors = ['white'];
  
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
  },

  chatHeader: {
    width: '100%',
  },

  backButtonContainer: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },

  backButton: {
    color: '#0a84ff',
    fontSize: 18,
  },

  headerTitle: {
    fontSize: 25,
    fontFamily: 'Roboto_500Medium_Italic',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  statusSection: {
    height: 145,
    paddingTop: 10,
    paddingBottom: 10,
  },

  statusScroll: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  statusWrapper: {
    alignItems: 'center',
    marginHorizontal: 12,
    width: 70,
    paddingBottom: 5,
  },

  statusCircle: {
    width: 70,
    height: 70,
    borderRadius: 75,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  statusAvatarImage: {
    width: '100%',
    height: '100%',
  },

  cloudBubble: {
    backgroundColor: '#d0cccc',
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    minHeight: 24,
  },

  cloudText: {
    fontSize: 10,
  },

  cloudTail: {},

  subHeader: {
    fontSize: 35,
    fontFamily: 'Roboto_500Medium_Italic',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
  },

  inboxArea: {
    flex: 1,
  },

  msgRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#222',
  },

  msgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  msgContent: {
    flex: 1,
    justifyContent: 'center',
  },

  msgName: {
    color: '#fff',
    fontWeight: 'bold',
  },

  msgTime: {
    color: '#666',
    fontSize: 12,
  },

  msgSnippet: {
    color: '#aaa',
    marginTop: 2,
    lineHeight: 18,
  },

  incomingBubble: {
    backgroundColor: '#2c2c2e',
    padding: 16,
    borderRadius: 18,
    marginVertical: 6,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },

  outgoingBubble: {
    backgroundColor: '#0a84ff',
    padding: 16,
    borderRadius: 18,
    marginVertical: 6,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },

  messageText: {
    color: '#fff',
    fontSize: 16,
  },

  inputBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 14,
    paddingBottom: Platform.OS === 'ios' ? 50 : 20,
    borderTopWidth: 1,
    alignItems: 'center',
    gap: 8,
  },

  input: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
  },

  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  sendButtonContainer: {
    backgroundColor: '#0a84ff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0a84ff',
    marginLeft: 8,
  },
});