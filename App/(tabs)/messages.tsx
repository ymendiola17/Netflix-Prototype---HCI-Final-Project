import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 20 }}>Messages Page</Text>
    </View>
  );
}