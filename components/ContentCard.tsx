import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ContentItem } from '../types';

export default function ContentCard({ item }: { item: ContentItem }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => console.log('pressed', item.title)}>
      <Image source={item.posterUrl} style={styles.poster} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 110, marginRight: 10 },
  poster: {
    width: 110,
    height: 160,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  title: { color: '#ccc',  fontSize: 15, marginTop: 5, fontFamily: 'BebasNeue', textAlign: 'center' },
});