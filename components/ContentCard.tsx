import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ContentItem } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { useState } from 'react';


const [showVideo, setShowVideo] = useState(false);
export default function ContentCard({
  item,
  showActions = false,
}: {
  item: ContentItem;
  showActions?: boolean;
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push('/moviesdescription')}>
        <Image source={item.posterUrl} style={styles.poster} />
      </TouchableOpacity>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.playButton}
            onPress={() => setShowVideo(true)}>
            <Ionicons name="play" size={16} color="white" />
          </TouchableOpacity>

          {showVideo && (
            <Video
              source={require('../assets/movieFile/movie.mp4')} // Placeholder video URL
              style={{ width: 300, height: 200 }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          )}

          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/moviesdescription')}>
            <Ionicons name="information-circle-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 110,
    marginRight: 10,
  },
  poster: {
    width: 110,
    height: 160,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 6,
  },
  playButton: {
    backgroundColor: 'transparent',
    padding: 6,
    borderRadius: 20,
  },
  iconButton: {
    backgroundColor: 'transparent',
    padding: 6,
    borderRadius: 20,
  },
});