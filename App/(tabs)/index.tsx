import {View,Text,ScrollView,Image,TouchableOpacity,StyleSheet,Pressable,Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '../../components/SearchHeader';
import ContentRow from '../../components/ContentRow';
import { useUserLists } from '../../context/UserListContext';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { lists } = useUserLists();
  const sorted = [...lists]
    .filter(list => list.visibleOnHome)
    .sort((a, b) => a.order - b.order);

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <SearchHeader />

        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerTitlePosition}>
            <Text style={styles.titleHeader}>My Friends</Text>
          </View>

          <View style={styles.otherUserSection}>
          <Link href="/profiles/yani" asChild>
            <TouchableOpacity style={styles.activeTab}>
              <Image
                source={require('../../assets/ProfilePictures/yani.jpeg')}
                style={styles.friendList}
              />
              <Text style={styles.userName}>Yani</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/profiles/kamy" asChild>
            <TouchableOpacity style={styles.activeTab}>
              <Image
                source={require('../../assets/ProfilePictures/profIslam.jpg')}
                style={styles.friendList}
              />
              <Text style={styles.userName}>Kamy</Text>
            </TouchableOpacity>
          </Link>

            <Link href="/profiles/amber" asChild>
              <TouchableOpacity style={styles.activeTab}>
                <Image
                  source={require('../../assets/ProfilePictures/amber.jpg')}
                  style={styles.friendList}
                />
                <Text style={styles.userName}>Amber</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/profiles/isaiah" asChild>
              <TouchableOpacity style={styles.activeTab}>
                <Image
                  source={require('../../assets/ProfilePictures/profIslam.jpg')}
                  style={styles.friendList}
                />
                <Text style={styles.userName}>Isaiah</Text>
              </TouchableOpacity>
            </Link>

          </View>

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
    backgroundColor: '#000', 
    padding: 5, 
    borderWidth: 0, 
    borderColor: 'red', 
  },
  friendList: {
    borderWidth: 1,
    borderColor: '#f3f3f3',
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  headerTitlePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // push to right
    borderWidth: 0.5,
    borderRadius: 0,
    borderColor: 'white',
    padding: 20,
  },
  pageTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // push to right
    borderWidth: 0.5,
    borderColor: 'red',
    padding: 20,
  },
  
  otherUserSection: {
     flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    borderRadius:20,
    borderWidth: 0.5,
    borderColor: 'black',
    gap: 20,
    padding: 0.5
  },
  mainUser: {
    borderWidth: 1,
    borderColor: '#ccc9c9',
    width: 75,
    height: 75,
    borderRadius: 100,
  },
    
  
  userName: {
    color: 'white',
    fontSize: 13,
    flexDirection:'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    borderWidth: 0.5,
    borderColor: 'black',
    gap: 20,
    padding: 0.5
  },
  
  titleHeader: {
    color: 'white',
    fontSize: 25,
    flexDirection:'row',
    justifyContent: 'flex-start',
    fontFamily: 'BebasNeue', // Use the custom font

  },
  video: {
    borderWidth: 0.5,
    borderColor: 'red',
    width: '37%',
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20
  },

  activeTab: {

  },

  tabText: {
    color: 'white',
    fontSize: 12,
  },
  iframe:{
      
  },
  optionRow: { paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  optionText: { color: 'white', fontSize: 18, marginLeft: 10 },

});