import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// pages
import Auth from "./src/pages/auth"

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'DeliusSwashCaps': require('./assets/fonts/DeliusSwashCaps-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth">
        <Stack.Screen name="auth" component={Auth} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
