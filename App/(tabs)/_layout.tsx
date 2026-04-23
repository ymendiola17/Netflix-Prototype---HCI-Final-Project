import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#000000',
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
          height: 50,
        },
        headerShadowVisible: false,

        tabBarShowLabel: false,
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#888',

        tabBarStyle: {
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 0,

          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,

          backgroundColor: '#101010',
          borderTopWidth: 0,
          borderRadius: 32,
          overflow: 'hidden',

          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 14,
        },

        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={28} color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/ProfilePictures/profIslam.jpg')}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                borderWidth: 1.2,
                borderColor: focused ? '#E50914' : '#888',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}