import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      
      {/* The Settings Option */}
      <Link href="/settings" style={styles.optionRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="settings-outline" size={20} color="white" />
          <Text style={styles.optionText}>App Settings</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 60 },
  header: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  optionRow: { paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  optionText: { color: 'white', fontSize: 18, marginLeft: 10 }
});