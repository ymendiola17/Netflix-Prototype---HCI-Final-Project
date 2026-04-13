import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* USer Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('UserPressed')}>
           <Image
                style={styles.mainUser}
            />
            <Text style= {styles.userName}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* Friends  Header*/}
      <View style={styles.headerTitlePosition}>
          <Text style= {styles.titleHeader}>My Friends</Text>
      </View>

      {/* Other user*/}
      <View style={styles.otherUserSection}>
       <TouchableOpacity style={[styles.activeTab]}>
          <Image
            style={styles.friendList}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={[ styles.activeTab] }>
          <Image
            style={styles.friendList}
          />
        </TouchableOpacity>
      </View>
      {/* Friends  Header*/}
      <View style={styles.headerTitlePosition}>
          <Text style= {styles.titleHeader}>My List</Text>
      </View>
      {/* video tab */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.video, styles.activeTab]}>
          <Text style={styles.tabText}>Video1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.video, styles.activeTab]}>
          <Text style={styles.tabText}>Video2</Text>
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
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    padding: 5, 
    borderWidth: 0, 
    borderColor: 'red', 
  },
  friendList: {
    borderWidth: 1,
    borderColor: '#E50914',
    width: 75,
    height: 75,
    borderRadius: 0,
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
    fontSize: 10,
    flexDirection:'row',
    justifyContent: 'flex-start',
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
    fontSize: 30,
    flexDirection:'row',
    justifyContent: 'flex-start',
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
  optionText: { color: 'white', fontSize: 18, marginLeft: 10 }
});