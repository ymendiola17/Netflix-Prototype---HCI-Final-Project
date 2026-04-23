import { View, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ContentItem } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video, ResizeMode } from 'expo-av';

export default function ContentCard({
  item,
  showActions = false,
}: {
  item: ContentItem;
  showActions?: boolean;
}) {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setShowVideo(true);
  };

  const closeVideo = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setShowVideo(false);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push({
        pathname: '/moviesdescription',
        params: { itemId: item.id }
      })}>
        <Image source={item.posterUrl} style={styles.poster} />
      </TouchableOpacity>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.playButton} onPress={openVideo}>
            <Ionicons name="play" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push({
              pathname: '/moviesdescription',
              params: { itemId: item.id }
            })}
          >
            <Ionicons name="information-circle-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Fullscreen video modal */}
      <Modal
        visible={showVideo}
        animationType="slide"
        onRequestClose={closeVideo}
        supportedOrientations={['landscape']}
      >
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <TouchableOpacity
            onPress={closeVideo}
            style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Video
            source={require('../assets/movieFile/movie.mp4')}
            style={{ flex: 1 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        </View>
      </Modal>
    </View>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 6,
  },
  playButton: { backgroundColor: 'transparent', padding: 6, borderRadius: 20 },
  iconButton: { backgroundColor: 'transparent', padding: 6, borderRadius: 20 },
});