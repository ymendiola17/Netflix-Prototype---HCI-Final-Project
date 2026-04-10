import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: true,
      headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
      tabBarActiveTintColor: '#E50914', // Netflix Red
      tabBarStyle: { backgroundColor: '#2e2e2e' } 
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIconStyle: { marginTop: 15},
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIconStyle: { marginTop: 15},
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="paper-plane" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIconStyle: { marginTop: 15},
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}