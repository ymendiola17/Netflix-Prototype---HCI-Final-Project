import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchHeader() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');

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
        backgroundColor: '#000',
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
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            onBlur={closeSearch}
            style={{
              color: 'white',
              backgroundColor: '#2e2e2e',
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
            color={expanded ? '#E50914' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}