import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useGlobalContext } from '../context/GlobalProvider'

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext()
  if (!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full items-center justify-center h-screen px-4 my-6">
            <View className="flex-row gap-1 items-center">
                {/* <Image source={logo} resizeMode="contain" className="w-12 h-12"/> */}
                <View className="justify-center items-end">
                  <Text className="text-4xl font-bold text-secondary font-pregular">Buddyget</Text> 
                <Text className="text-xs text-black font-pregular">Meet Your Budget Padi</Text>
                </View>
            </View>
            <Button title="Continue to Sign In" containerStyles="w-full mt-12" handlePress={() => router.push('/sign-in')}/>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
