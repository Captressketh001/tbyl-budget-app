import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl h-[60px] justify-center items-center ${containerStyles}`}
    disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button