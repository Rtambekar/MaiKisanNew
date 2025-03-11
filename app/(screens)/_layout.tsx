import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='OTPScreen' />
      <Stack.Screen name='Sigup' />
      <Stack.Screen name='LanguageSelection' />
      <Stack.Screen name='Explore' />
    </Stack>
  )
}

export default RootLayout;