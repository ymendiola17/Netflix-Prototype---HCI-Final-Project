import React, { createContext, useContext, useState } from 'react';

export interface Theme {
  background: string;
  surface: string;
  accent: string;
  text: string;
  subtext: string;
}

const THEMES: Record<string, Theme> = {
  netflix: {
    background: '#000000',
    surface: '#1a1a1a',
    accent: '#E50914',
    text: '#ffffff',
    subtext: '#888888',
  },
  midnight: {
    background: '#0a0a1a',
    surface: '#1a1a2e',
    accent: '#7B2FBE',
    text: '#ffffff',
    subtext: '#888888',
  },
  forest: {
    background: '#0a1a0a',
    surface: '#1a2e1a',
    accent: '#2ecc71',
    text: '#ffffff',
    subtext: '#888888',
  },
  ocean: {
    background: '#0a0a1a',
    surface: '#0d1b2a',
    accent: '#0099ff',
    text: '#ffffff',
    subtext: '#888888',
  },
  sunset: {
    background: '#1a0a00',
    surface: '#2a1500',
    accent: '#ff6b35',
    text: '#ffffff',
    subtext: '#888888',
  },
};

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (name: string) => void;
  THEMES: Record<string, Theme>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState('netflix');

  const setTheme = (name: string) => setThemeName(name);

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeName], themeName, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}