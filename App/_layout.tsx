import { View} from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar} from 'expo-status-bar';

export default function RootLayout() {
  return (
  <View style={{ flex: 1, backgroundColor: '#000'}}>
    <StatusBar style='light' />
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#000'},}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  </View>
  );
}