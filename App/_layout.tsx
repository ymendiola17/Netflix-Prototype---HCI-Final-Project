import React from 'react';
import { View } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserListsProvider } from '../context/UserListContext';
import { useFonts } from 'expo-font';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <UserListsProvider>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar style='light' />
        <Stack screenOptions={{ contentStyle: { backgroundColor: '#000' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="list/[id]" options={{  headerShown: false, }} />
          <Stack.Screen name="profiles/[username]" options={{ headerShown: false }} />
        </Stack>
      </View>
    </UserListsProvider>
  );
}

