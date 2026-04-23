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

const EXCLUDED_FROM_FILTER = ['Keep Watching', 'Trending Now'];

export default function HomeScreen() {
  const { lists, toggleHomeVisibility } = useUserLists();
  const { theme } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);

  const sorted = useMemo(() => {
    return [...lists]
      .filter(list => list.visibleOnHome)
      .sort((a, b) => a.order - b.order);
  }, [lists]);

  const allToggleableLists = useMemo(() => {
    return lists.filter(list => !EXCLUDED_FROM_FILTER.includes(list.title));
  }, [lists]);

  const filteredLists = useMemo(() => {
    return [...lists]
      .filter(list => list.visibleOnHome)
      .sort((a, b) => a.order - b.order);
  }, [lists]);

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

          <View style={{ marginTop: 24 }}>
            {filteredLists.map(list => (
              <ContentRow key={list.id} title={list.title} items={list.items} />
            ))}
          </View>
        </ScrollView>

        {/* Filter Modal */}
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
                Manage Home Rows
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.subtext }]}>
                Tap to show or hide rows on your home page
              </Text>

              <ScrollView style={{ maxHeight: 400 }}>
                {allToggleableLists.map(list => {
                  const isVisible = list.visibleOnHome;
                  return (
                    <TouchableOpacity
                      key={list.id}
                      style={styles.optionRow}
                      onPress={() => toggleHomeVisibility(list.id)}
                      activeOpacity={0.7}
                    >
                      <View style={[
                        styles.checkbox,
                        {
                          borderColor: theme.accent,
                          backgroundColor: isVisible ? theme.accent : 'transparent',
                        }
                      ]}>
                        {isVisible && (
                          <Ionicons name="checkmark" size={14} color="#fff" />
                        )}
                      </View>
                      <Text style={[styles.optionText, { color: theme.text }]}>
                        {list.title}
                      </Text>
                      <Ionicons
                        name={isVisible ? 'eye' : 'eye-off-outline'}
                        size={18}
                        color={isVisible ? theme.accent : theme.subtext}
                        style={{ marginLeft: 'auto' }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => setFilterVisible(false)}
                  style={[styles.actionBtn, { backgroundColor: theme.accent }]}
                >
                  <Text style={{ color: 'white', fontWeight: '600' }}>Done</Text>
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
  container: { flex: 1, padding: 5 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 10,
  },
  searchContainer: { flex: 1 },
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
  userName: { fontSize: 13, textAlign: 'center' },
  titleHeader: { fontSize: 25, fontFamily: 'BebasNeue' },
  activeTab: {},
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    gap: 12,
  },
  optionText: { fontSize: 16 },
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  modalSubtitle: { fontSize: 13, marginBottom: 16 },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
});