import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserTransactions, signOut } from '../../lib/appWrite'
import useAppWrite from '../../lib/useAppWrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import Ionicons from '@expo/vector-icons/Ionicons';
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Settings = () => {
  const {user, setUser, setisLoggedIn } = useGlobalContext()
  const { data: userTransactions } = useAppWrite(() =>
    getUserTransactions(user.$id)
  );
  const logout  = async() => {
    await signOut()
    setUser(null)
    setisLoggedIn(false)
    router.replace('/sign-in')
  }
  return (
    <SafeAreaView className="bg-white h-full">
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity 
              className="w-full items-end mb-10"
              onPress={logout}
              >
                <Ionicons name="log-in-outline" size={24} color="black" />
            </TouchableOpacity>
            <View className="w-16 h-16 border 
            border-secondary rounded-lg justify-center items-center">
              <Image source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover'/>
            </View>

            <InfoBox  
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <InfoBox  
              title={user?.email}
              containerStyles='mt-0'
              titleStyles='text-lg'
            />

            <View className="mt-3 flex-row">
              <InfoBox  
                title={`${userTransactions?.expenses?.length}`}
                subtitle="Expenses Logged"
                containerStyles='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox  
                title={userTransactions?.income?.length}
                subtitle="Income Streams"
                titleStyles='text-lg'
              />
            </View>
          </View>
    </SafeAreaView>
  )
}

export default Settings