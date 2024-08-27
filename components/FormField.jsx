import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const FormField = ({title, value, placeholder, 
    handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-sm text-black font-pregular">{title}</Text>
      <View className="w-full h-16 px-4 bg-white border border-gray-100 rounded-2xl
       focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-[#7b7b8b] font-pmedium text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
            >
               <Ionicons name={!showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="black" />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField