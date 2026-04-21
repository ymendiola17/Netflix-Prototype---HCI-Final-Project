import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ContentItem } from '../types';

export default function ContentCard({ item }: { item: ContentItem }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => console.log('pressed', item.title)}>
      <View style={styles.poster} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
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
  title: { color: '#ccc', fontSize: 11, marginTop: 5 },
});