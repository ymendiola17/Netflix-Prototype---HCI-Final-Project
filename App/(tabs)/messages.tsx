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
 SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Structure for messages.
type Message = {
 id: string;
 name: string;
 text: string;
 time: string;
};

// Structure for individual chat messages.
type ChatMessage = {
 id: string;
 text: string;
 sender: 'me' | 'them';
};

export default function Page() {
 const navigation = useNavigation();
// State for user's status and messages.
 const [myStatus, setMyStatus] = useState(' ');
 const fixedStatuses = ['Happy!', 'Sad :(', 'Eh'];
 const allStatuses = [myStatus, ...fixedStatuses];

 // Sample messages for the inbox.
 const [messages] = useState<Message[]>([
   { id: '1', name: 'Yani', text: 'Hey! What movie are you watching?', time: '2m' },
   { id: '2', name: 'Kamy', text: 'Hi, how are you? Do you have any show recommendations?', time: '1h' },
   { id: '3', name: 'Isaiah', text: 'Hey, I see you are watching a movie. How do you like it?', time: '3h' },
 ]);

 const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
 const [replyText, setReplyText] = useState('');
 const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

 const updateMyStatus = () => {
   if (Platform.OS === 'ios') {
     Alert.prompt("Update Status", "Your thoughts go here...", (val) => {
       setMyStatus(val);
     });
   } else {
     const text = prompt("Your thoughts go here...");
     if (text) setMyStatus(text);
   }
 };

 const sendMessage = () => {
   if (!replyText.trim()) return;

   setChatMessages(prev => [
     ...prev,
     {
       id: Date.now().toString(),
       text: replyText,
       sender: 'me'
     }
   ]);

   setReplyText('');
 };

 return (
   <SafeAreaView style={styles.container}>
     <KeyboardAvoidingView
       style={{ flex: 1 }}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
     >

       // Header area that shows either "Status" or the name of the selected message.
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

         // Status section with circles and speech bubbles.
       {!selectedMessage && (
         <>
           <View style={styles.statusSection}>
             <ScrollView
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.statusScroll}
             >
               {allStatuses.map((feeling, index) => (
                 <View key={index} style={styles.statusWrapper}>

                   <View
                     style={[
                       styles.cloudBubble,
                       { opacity: feeling.trim().length > 0 ? 1 : 0 }
                     ]}
                   >
                     <Text style={styles.cloudText} numberOfLines={1}>
                       {feeling}
                     </Text>
                     <View style={styles.cloudTail} />
                   </View>

                   <TouchableOpacity
                     style={[styles.statusCircle, { borderColor: getBorderColor(index) }]}
                     onPress={index === 0 ? updateMyStatus : undefined}
                   >
                     <Text style={{ fontSize: 24 }}>
                       {index === 0
                         ? (myStatus.trim().length === 0 ? '+' : '👤')
                         : '👤'}
                     </Text>
                   </TouchableOpacity>

                 </View>
               ))}
             </ScrollView>
           </View>

           <Text style={styles.subHeader}>My Messages</Text>
         </>
       )}

        // Inbox area that shows either the list of messages or the individual chat.
       {!selectedMessage ? (
         <ScrollView
           style={styles.inboxArea}
           keyboardShouldPersistTaps="handled"
         >
           {messages.map((msg) => (
             <TouchableOpacity
               key={msg.id}
               style={styles.msgRow}
               onPress={() => {
                 setSelectedMessage(msg);
                 setChatMessages([
                   { id: 'init', text: msg.text, sender: 'them' }
                 ]);
               }}
             >
               <View style={styles.msgAvatar}>
                 <Text style={{ fontSize: 20 }}>👤</Text>
               </View>

               <View style={styles.msgContent}>
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                   <Text style={styles.msgName}>{msg.name}</Text>
                   <Text style={styles.msgTime}>{msg.time}</Text>
                 </View>
                 <Text style={styles.msgSnippet} numberOfLines={1}>
                   {msg.text}
                 </Text>
               </View>
             </TouchableOpacity>
           ))}
         </ScrollView>
       ) : (
         /* CHAT */
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

           {/* 🔥 BIGGER INPUT AREA */}
           <View style={styles.inputBar}>
             <TextInput
               style={styles.input}
               value={replyText}
               onChangeText={setReplyText}
               placeholder="Message..."
               placeholderTextColor="#aaa"
               multiline={false}
             />

             <TouchableOpacity style={styles.sendButtonContainer} onPress={sendMessage}>
               <Text style={styles.sendButton}>Send</Text>
             </TouchableOpacity>
           </View>

         </View>
       )}

     </KeyboardAvoidingView>
   </SafeAreaView>
 );
}

// Border colors for status circles.
const getBorderColor = (index: number) => {
 const colors = ['#d14775', '#260de6', '#71f439', '#fec004'];
 return colors[index % colors.length];
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#000'
 },

 chatContainer: {
   flex: 1,
   justifyContent: 'space-between',
   paddingBottom: Platform.OS === 'ios' ? 25 : 15
 },

 header: {
   justifyContent: 'center',
   alignItems: 'center',
   padding: 10
 },

 chatHeader: {
   width: '100%'
 },

 backButtonContainer: {
   alignSelf: 'flex-start',
   marginBottom: 5
 },

 backButton: {
   color: '#0a84ff',
   fontSize: 18
 },

 // Main header title for both status and chat.
 headerTitle: {
   fontSize: 25,
   fontWeight: 'bold',
   color: '#fff',
   textAlign: 'center'
 },

 // Status section at the top of the messages tab.
 statusSection: {
   height: 145,
   paddingTop: 10,
   paddingBottom: 10
 },

 statusScroll: {
   paddingHorizontal: 15,
   paddingBottom: 10
 },

 statusWrapper: {
   alignItems: 'center',
   marginHorizontal: 12,
   width: 70,
   paddingBottom: 5
 },

 statusCircle: {
   width: 63,
   height: 63,
   borderRadius: 30,
   borderWidth: 3,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff'
 },

 cloudBubble: {
   backgroundColor: '#d0cccc',
   padding: 10,
   borderRadius: 15,
   marginBottom: 8,
   minHeight: 24
 },

 cloudText: { fontSize: 10 },
 cloudTail: {},

 // Subheader for "My Messages" section.
 subHeader: {
   fontSize: 25,
   fontWeight: 'bold',
   paddingHorizontal: 20,
   paddingVertical: 15,
   color: '#fff'
 },

 // Inbox area for messages list and individual chat.
 inboxArea: { flex: 1 },

 // Each message row in the inbox.
 msgRow: {
   flexDirection: 'row',
   padding: 15,
   borderBottomWidth: 0.5,
   borderColor: '#222'
 },

 // Avatar for each message in the inbox.
 msgAvatar: {
   width: 50,
   height: 50,
   borderRadius: 25,
   backgroundColor: '#333',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: 15
 },

 // Content area for each message in the inbox.
 msgContent: { flex: 1 },
 msgName: { color: '#fff', fontWeight: 'bold' },
 msgTime: { color: '#666', fontSize: 12 },
 msgSnippet: { color: '#aaa' },

 // Bubbles for incoming and outgoing messages in the chat.
 incomingBubble: {
   backgroundColor: '#2c2c2e',
   padding: 16,
   borderRadius: 18,
   marginVertical: 6,
   alignSelf: 'flex-start',
   maxWidth: '85%'
 },

 outgoingBubble: {
   backgroundColor: '#0a84ff',
   padding: 16,
   borderRadius: 18,
   marginVertical: 6,
   alignSelf: 'flex-end',
   maxWidth: '85%'
 },

 messageText: {
   color: '#fff',
   fontSize: 16
 },

// Message bar at the bottom of individual messages.
 inputBar: {
   flexDirection: 'row',
   paddingHorizontal: 12,
   paddingVertical: 14,
   paddingBottom: Platform.OS === 'ios' ? 50 : 20,
   borderTopWidth: 1,
   alignItems: 'center'
 },

 input: {
   flex: 1,
   backgroundColor: '#1c1c1e',
   borderRadius: 24,
   paddingHorizontal: 16,
   paddingVertical: 12,
   fontSize: 16,
   color: '#fff',
   marginRight: 10
 },

 // Send button on individual messages.
 sendButtonContainer: {
   backgroundColor: '#0a84ff',
   paddingHorizontal: 18,
   paddingVertical: 12,
   borderRadius: 24,
   justifyContent: 'center',
   alignItems: 'center'
 },

 sendButton: {
   color: '#fff',
   fontWeight: 'bold',
   fontSize: 15
 }
});