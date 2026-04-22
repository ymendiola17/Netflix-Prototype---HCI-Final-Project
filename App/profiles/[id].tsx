import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';

const profileData: Record<string, { name: string; posters: any[] }> = {
  yani: {
    name: 'Yani',
    posters: [
      require('../../assets/posters/Genre/Action/BloodHounds3.webp'),
      require('../../assets/posters/Genre/Kdramas/Pavane.webp'),
      require('../../assets/posters/Genre/Crime/TheGardener.webp'),
      require('../../assets/posters/Genre/ChildrenAndFamily/DespicableMe4.webp'),
    ],
  },
  kamy: {
    name: 'Kamy',
    posters: [
      require('../../assets/posters/Genre/Action/BloodHounds3.webp'),
      require('../../assets/posters/Genre/Kdramas/Pavane.webp'),
    ],
  },
  amber: {
    name: 'Amber',
    posters: [
      require('../../assets/posters/Genre/Action/BloodHounds3.webp'),
      require('../../assets/posters/Genre/Kdramas/Pavane.webp'),
    ],
  },
};

export default function ProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const profile = profileData[id ?? ''];

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Profile not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>{profile.name}'s List</Text>

        <View style={styles.grid}>
          {profile.posters.map((poster, index) => (
            <Image key={index} source={poster} style={styles.poster} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  text: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
    fontFamily: 'BebasNeue',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  poster: {
    width: 110,
    height: 160,
    borderRadius: 8,
  },
});