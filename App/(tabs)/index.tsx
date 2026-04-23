import {View,Text,ScrollView,Image,TouchableOpacity,StyleSheet,Pressable,Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '../../components/SearchHeader';
import ContentRow from '../../components/ContentRow';
import { useUserLists } from '../../context/UserListContext';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function HomeScreen() {
  const { lists } = useUserLists();
  const { theme } = useTheme();
  const sorted = [...lists]
    .filter(list => list.visibleOnHome)
    .sort((a, b) => a.order - b.order);

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <SearchHeader />

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
            {sorted.map(list => (
              <ContentRow key={list.id} title={list.title} items={list.items} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 5, 
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
  optionRow: { paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  optionText: { fontSize: 18, marginLeft: 10 },
});