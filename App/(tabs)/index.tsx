import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Keyboard,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SearchHeader from '../../components/SearchHeader';
import ContentRow from '../../components/ContentRow';
import { useUserLists } from '../../context/UserListContext';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const EXCLUDED_FROM_FILTER = ['Keep Watching', 'Trending Now']; // These lists are more about user activity than specific genres, so we exclude them from genre filtering.

export default function HomeScreen() {
  const { lists } = useUserLists();
  const { theme } = useTheme();

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const sorted = useMemo(() => {
    return [...lists]
      .filter(list => list.visibleOnHome)
      .sort((a, b) => a.order - b.order);
  }, [lists]);

  const genres = useMemo(() => {
    return [...new Set(
      sorted
        .map(list => list.title)
        .filter(title => !EXCLUDED_FROM_FILTER.includes(title))
    )];
  }, [sorted]);

  const filteredLists = useMemo(() => {
    if (selectedGenres.length === 0) return sorted;
    return sorted.filter(
      list =>
        EXCLUDED_FROM_FILTER.includes(list.title) ||
        selectedGenres.includes(list.title)
    );
  }, [sorted, selectedGenres]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <SearchHeader />
          </View>

          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={styles.filterButton}
          >
            <Ionicons name="reorder-four-outline" size={22} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={[styles.container, { backgroundColor: theme.background }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerTitlePosition}>
            <Text style={[styles.titleHeader, { color: theme.text }]}>My Friends</Text>
          </View>

          <View style={styles.otherUserSection}>
            <Link href="/profiles/yani" asChild>
              <TouchableOpacity style={styles.activeTab}>
                <Image
                  source={require('../../assets/ProfilePictures/yani.jpeg')}
                  style={[styles.friendList, { borderColor: theme.accent }]}
                />
                <Text style={[styles.userName, { color: theme.text }]}>Yani</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/profiles/kamy" asChild>
              <TouchableOpacity style={styles.activeTab}>
                <Image
                  source={require('../../assets/ProfilePictures/kamy.jpg')}
                  style={[styles.friendList, { borderColor: theme.accent }]}
                />
                <Text style={[styles.userName, { color: theme.text }]}>Kamy</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/profiles/amber" asChild>
              <TouchableOpacity style={styles.activeTab}>
                <Image
                  source={require('../../assets/ProfilePictures/amber.jpg')}
                  style={[styles.friendList, { borderColor: theme.accent }]}
                />
                <Text style={[styles.userName, { color: theme.text }]}>Amber</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/profiles/isaiah" asChild>
              <TouchableOpacity style={styles.activeTab}>
                <Image
                  source={require('../../assets/ProfilePictures/isaiah.jpg')}
                  style={[styles.friendList, { borderColor: theme.accent }]}
                />
                <Text style={[styles.userName, { color: theme.text }]}>Isaiah</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/*----List Boxes----*/}
          <View style={{ marginTop: 24 }}>
            {filteredLists.map(list => (
              <ContentRow key={list.id} title={list.title} items={list.items} />
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={filterVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFilterVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setFilterVisible(false)}
          >
            <Pressable
              style={[styles.modalContent, { backgroundColor: theme.background }]}
              onPress={() => {}}
            >
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Filter by Genre
              </Text>

              {genres.map(genre => {
                const selected = selectedGenres.includes(genre);

                return (
                  <TouchableOpacity
                    key={genre}
                    style={styles.optionRow}
                    onPress={() => toggleGenre(genre)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkbox,
                      {
                        borderColor: theme.accent,
                        backgroundColor: selected ? theme.accent : 'transparent',
                      }
                    ]}>
                      {selected && (
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      )}
                    </View>

                    <Text style={[styles.optionText, { color: theme.text }]}>
                      {genre}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <View style={styles.modalActions}>
                <TouchableOpacity onPress={clearFilters} style={styles.actionBtn}>
                  <Text style={{ color: theme.text }}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFilterVisible(false)}
                  style={styles.actionBtn}
                >
                  <Text style={{ color: theme.text }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendList: {
    borderWidth: 1,
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  headerTitlePosition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherUserSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    borderRadius: 20,
    gap: 20,
    padding: 0.5,
  },
  userName: {
    fontSize: 13,
    textAlign: 'center',
  },
  titleHeader: {
    fontSize: 25,
    fontFamily: 'BebasNeue',
  },
  activeTab: {},
  tabText: {
    fontSize: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    gap: 12,
  },
  optionText: {
    fontSize: 18,
    
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    maxHeight: '70%',

  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 16,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});