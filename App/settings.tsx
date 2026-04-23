import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, themeName, setTheme, THEMES } = useTheme();
  const [username, setUsername] = useState('Username');
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const themeLabels: Record<string, string> = {
    netflix: 'Netflix',
    midnight: 'Midnight',
    forest: 'Forest',
    ocean: 'Ocean',
    sunset: 'Sunset',
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, { color: theme.text }]}>Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Profile Settings */}
      <Text style={[styles.sectionHeader, { color: theme.subtext }]}>PROFILE</Text>
      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <Text style={[styles.label, { color: theme.subtext }]}>Username</Text>
        {editingUsername ? (
          <View style={styles.editRow}>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.accent }]}
              value={tempUsername}
              onChangeText={setTempUsername}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                setUsername(tempUsername);
                setEditingUsername(false);
              }}
            >
              <Text style={[styles.saveText, { color: theme.accent }]}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editRow} onPress={() => setEditingUsername(true)}>
            <Text style={[styles.value, { color: theme.text }]}>{username}</Text>
            <Ionicons name="pencil-outline" size={18} color={theme.subtext} />
          </TouchableOpacity>
        )}
      </View>

      {/* Appearance */}
      {/* Appearance */}
    <Text style={[styles.sectionHeader, { color: theme.subtext }]}>APPEARANCE</Text>
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
    <Text style={[styles.label, { color: theme.subtext }]}>Theme</Text>
    <View style={styles.themesGrid}>
        {Object.entries(THEMES).map(([key, t]) => (
        <TouchableOpacity
            key={key}
            onPress={() => setTheme(key)}
            style={[
            styles.themeOption,
            { backgroundColor: t.accent },
            themeName === key && { borderWidth: 3, borderColor: theme.text },
            ]}
        />
        ))}
    </View>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  pageTitle: { fontSize: 18, fontWeight: '600' },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  label: { fontSize: 12, marginBottom: 8 },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: { fontSize: 16 },
  input: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginRight: 12,
  },
  saveText: { fontSize: 16, fontWeight: '600' },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  themeOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  accentDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  themeLabel: { fontSize: 11 },
});