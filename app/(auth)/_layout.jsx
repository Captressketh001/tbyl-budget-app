import React from 'react'
import { Stack, SplashScreen } from 'expo-router'
import { StatusBar } from 'react-native'

SplashScreen.preventAutoHideAsync()
const AuthLayout = () => {
  return (
    <>
    <Stack>
      <Stack.Screen 
        name="sign-in"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="sign-up"
        options={{
          headerShown: false
        }}
      />
    </Stack>
    <StatusBar backgroundColor="#161622" style="light"/>
    </>
  )
}

export default AuthLayout