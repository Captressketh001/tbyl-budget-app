import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from './Button'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center mt-8 px-4">
      {/* <Image source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
     /> */}
     <Text className="font-psemibold text-xl text-center text-secondary">
                  {title}
                </Text>
                <Text className="font-pmedium text-sm text-black" >
                  {subtitle}
                </Text>

                {/* <Button 
                    title="Create video"
                    handlePress={() => router.push('/create')}
                    containerStyles="w-full my-5"
                /> */}
    </View>
  )
}

export default EmptyState