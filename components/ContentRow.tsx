import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContentCard from './ContentCard';
import { ContentItem } from '../types';

interface Props {
  title: string;
  items: ContentItem[];
}

export default function ContentRow({ title, items }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ContentCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { color: '#fff', fontSize: 25, fontFamily: 'BebasNeue', marginBottom: 10, paddingHorizontal: 5 },
});