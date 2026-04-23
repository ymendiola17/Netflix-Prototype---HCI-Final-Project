import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SearchHeader() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const { theme } = useTheme();

  const closeSearch = () => {
    Keyboard.dismiss();
    setExpanded(false);
    setQuery('');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: theme.background,  // ← was '#000'
      }}
    >
      <Image
        source={require('../assets/appLogo/Logo.png')}
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {expanded && (
          <TextInput
            autoFocus
            placeholder="Search..."
            placeholderTextColor={theme.subtext}  // ← was '#888'
            value={query}
            onChangeText={setQuery}
            onBlur={closeSearch}
            style={{
              color: theme.text,  // ← was 'white'
              backgroundColor: theme.surface,  // ← was '#2e2e2e'
              borderRadius: 20,
              paddingHorizontal: 15,
              height: 35,
              width: 220,
              marginRight: 8,
            }}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            if (expanded) {
              closeSearch();
            } else {
              setExpanded(true);
            }
          }}
        >
          <Ionicons
            name="search"
            size={24}
            color={expanded ? theme.accent : theme.text}  // ← was hardcoded
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}