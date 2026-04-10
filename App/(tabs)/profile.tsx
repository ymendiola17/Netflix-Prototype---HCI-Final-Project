import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Gear Icon (Top Right) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
          <Ionicons name='settings-outline' size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
        style={styles.profilePic}
        />
        {/* Username */}
        <Text style= {styles.userName}>Username</Text>
      </View>

      {/* Two Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>My Picks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>My Lists</Text>
        </TouchableOpacity>
      </View>

      

      
      {/* The Settings Option 
      <Link href="/settings" style={styles.optionRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="settings-outline" size={20} color="white" />
          <Text style={styles.optionText}>App Settings</Text>
        </View>
      </Link> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, borderWidth: 0.5, borderColor: 'red', },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // push to right
    borderWidth: 0.5,
    borderColor: 'red',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  profilePic: {
    borderWidth: 2,
    borderColor: '#E50914',
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: 0.5,
    borderColor: 'white',
    gap: 20,
    padding: 20,
  },

  tab: {
    borderWidth: 0.5,
    borderColor: 'red',
    width: '37%',
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {

  },

  tabText: {
    color: 'white',
    fontSize: 12,
  },
  optionRow: { paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  optionText: { color: 'white', fontSize: 18, marginLeft: 10 }
});