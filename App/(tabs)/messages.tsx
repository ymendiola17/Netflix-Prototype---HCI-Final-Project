import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Page() {
  const navigation = useNavigation();
  
  // First bubble is personal status to update, others are fixed.
  const [myStatus, setMyStatus] = useState(' '); 
  const fixedStatuses = ['Happy!', 'Sad :(', 'Eh'];
  const allStatuses = [myStatus, ...fixedStatuses];

  //Function to update your status.
  const updateMyStatus = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt("Update Status", "Your thoughts go here...", (val) => {
        setMyStatus(val);
      });
    } else {
      const text = prompt("How are you feeling?");
      if (text) {
        setMyStatus(text);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Status</Text>
      </View>

      // Status section with interactive circles and cloud bubbles.
      <View style={styles.statusSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusScroll}>
          {allStatuses.map((feeling, index) => (
            <View key={index} style={styles.statusWrapper}>
              {feeling.trim().length > 0 && (
                <View style={styles.cloudBubble}>
                  <Text style={styles.cloudText} numberOfLines={1}>{feeling}</Text>
                  <View style={styles.cloudTail} />
                </View>
              )}

              // Interactive status circles, only first bubble.
              <TouchableOpacity 
                style={[styles.statusCircle, { borderColor: getBorderColor(index) }]} 
                // Only the first circle (index 0) is clickable
                onPress={index === 0 ? updateMyStatus : undefined}
                activeOpacity={index === 0 ? 0.7 : 1}
              >

                // Emojis for status circles.
                <Text style={{fontSize: 24}}>{index === 0 ? '👤' : '👤'}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.subHeader}>My Messages</Text>
    // Edit messages here.
      <ScrollView style={styles.inboxArea}>
        {/* still need to add message code here */}
      </ScrollView>
    </View>
  );
}
// Styles for status circles.
const getBorderColor = (index: number) => {
  const colors = ['#d14775', '#260de6', '#71f439', '#fec004'];
  return colors[index % colors.length];
};
// Styles for the messages screen.
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fefcfc' 
  },
  // The header at the top of the screen.
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#fefbfb',
    marginTop: Platform.OS === 'ios' ? 50 : 20 
  },
  // The back button at the top of screen.
  backButton: { 
    width: 35, 
    height: 35, 
    borderRadius: 18, 
    backgroundColor: '#7a7a7a', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  // The back icon at top of screen.
  backIcon: { color: '#fcf9f9', fontSize: 18, fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: '30%' },
  statusSection: { height: 120, paddingVertical: 10 },
  statusScroll: { paddingHorizontal: 15, alignItems: 'flex-end' },
  statusWrapper: { alignItems: 'center', marginHorizontal: 12, width: 70 },
  statusCircle: { 
    width: 55, 
    height: 55, 
    borderRadius: 27.5, 
    borderWidth: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },

  // The cloud bubble that appears above the status circles.
  cloudBubble: { 
    backgroundColor: '#d0cccc', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 15, 
    marginBottom: 8, 
    minWidth: 60, 
    alignItems: 'center' 
  },

  // The text inside the cloud bubble.
  cloudText: { fontSize: 10, color: '#333', fontWeight: '700' },
  cloudTail: { 
    width: 0, 
    height: 0, 
    borderLeftWidth: 6, 
    borderLeftColor: 'transparent', 
    borderRightWidth: 6, 
    borderRightColor: 'transparent', 
    borderTopWidth: 6, 
    borderTopColor: '#dcdcdc', 
    position: 'absolute', 
    bottom: -6 
  },
  
  // Subheader for the messages section.
  subHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: '#fefefe' 
  },
  inboxArea: { flex: 1 },
});