import { View, Text, ScrollView, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import Button from '../../components/Button'
import {Link, router} from 'expo-router'
import { createUser } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import logo from '../../assets/logo.jpg'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {setisLoggedIn, setUser } = useGlobalContext()
  const submit = async () => {
    if (!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result)
      setisLoggedIn(true)

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
    
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Text className="text-2xl text-secondary text-semibold mt-5 font-psemibold">Sign up to Buddyget</Text>
            <FormField
              title="Username"
              value={form.username}
              placeholder="Enter Username"
              handleChangeText={(e) => setForm({...form, username: e})}
              otherStyles="mt-10"
            />
            <FormField
              title="Email"
              value={form.email}
              placeholder="Enter Email Address"
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              placeholder="Enter Password"
              handleChangeText={(e) => setForm({...form, password:e})}
              otherStyles="mt-7"
              keyboardType="password"
            />

            <Button 
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex-row justify-center pt-5 gap-2">
              <Text className="font-pregular text-sm text-black">Already have an account?</Text>
              <Link href="/sign-in" className='text-sm font-pregular text-secondary'>Login</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp