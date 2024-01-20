import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// pages
import Auth from "./src/pages/auth"
import Videos from "./src/pages/videos";

const Stack = createNativeStackNavigator();

export default function App() {
  const [route, setRoute] = useState('')
  const [fontsLoaded, fontError] = useFonts({
    'DeliusSwashCaps': require('./assets/fonts/DeliusSwashCaps-Regular.ttf'),
  });

  useEffect(() => {
    const initialize = async() => {
      try {
        const id = await AsyncStorage.getItem("id")

        if (id != null) {
          setRoute('videos')
        } else {
          setRoute('auth')
        }
      } catch(e) {
        setRoute('auth')
      }
    }

    initialize()
  }, [])

  if (!fontsLoaded && !fontError && !route) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={route}>
        <Stack.Screen name="auth" component={Auth} options={{ headerShown: false }}/>
        <Stack.Screen name="videos" component={Videos} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
