import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from "../../components/Button";


const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full h-full mt-8 px-4">
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            className="w-full h-60 rounded-3xl"
            colors={["#FF5C75", "#9B64EE"]}
          >
            <View className="m-4">
              <View className="mt-3">
              <Text className="text-2xl text-white font-pmedium">Total balance</Text>
              </View>
              <View>
              <Text className="text-[40px] text-white font-pmedium mt-2">$123,450.30</Text>
              </View>
              
              <View className="flex-row justify-between items-center mt-4">
                  <View className="flex-row items-center gap-2">
                      <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                      <Ionicons name="chevron-down-circle-outline" size={24} color="#FF5C75" />
                      </View>
                      <View>
                        <Text className="text-lg text-white">Expenses</Text>
                        <Text className="text-lg text-white">$1234.667</Text>
                      </View>
                  </View>
                  <View className="flex-row items-center gap-2">
                      <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                      <Ionicons name="chevron-up-circle-outline" size={24} color="#38a169" />
                      </View>
                      <View>
                        <Text className="text-lg text-white">Income</Text>
                        <Text className="text-lg text-white">$5234.667</Text>
                      </View>
                  </View>
              </View>
            </View>
          </LinearGradient>

          <View className="mt-8">
            <Text className="text-2xl font-pmedium">Recent Transactions</Text>

            <View className="flex-row justify-between mt-4">
              <Button title='All' containerStyles="w-[100px] h-[45px] rounded-full" textStyles=" font-pregular text-sm"/>
              <Button title='Income' containerStyles="w-[120px] h-[45px] border border-gray-100 rounded-full bg-white" textStyles="text-gray-100 font-pregular text-sm"/>
              <Button title='Expenses' containerStyles="w-[120px] h-[45px] border border-gray-100 rounded-full bg-white" textStyles="text-gray-100 font-pregular text-sm"/>
            </View>

            <View className="mt-4">
              <View className="border flex-row justify-between items-center px-6 mb-2 border-gray-100 h-20 rounded-lg">
                <View>
                  <Text className="text-lg font-pmedium">Salary</Text>
                  <Text>Aug 26 2024</Text>
                </View>
                <View>
                  <Text className="text-2xl text-[#38a169]">$2300</Text>
                </View>
              </View>
              <View className="border flex-row justify-between items-center px-6 mb-2 border-gray-100 h-20 rounded-lg">
                <View>
                  <Text className="text-lg font-pmedium">Groceries</Text>
                  <Text>Aug 26 2024</Text>
                </View>
                <View>
                  <Text className="text-2xl">-$300</Text>
                </View>
              </View>
              <View className="border flex-row justify-between items-center px-6 mb-2 border-gray-100 h-20 rounded-lg">
                <View>
                  <Text className="text-lg font-pmedium">Phone Bill</Text>
                  <Text>Aug 26 2024</Text>
                </View>
                <View>
                  <Text className="text-2xl">-$200</Text>
                </View>
              </View>
              <View className="border flex-row justify-between items-center px-6 mb-2 border-gray-100 h-20 rounded-lg">
                <View>
                  <Text className="text-lg font-pmedium">Rent</Text>
                  <Text>Aug 26 2024</Text>
                </View>
                <View>
                  <Text className="text-2xl">-$1300</Text>
                </View>
              </View>
              <View className="border flex-row justify-between items-center px-6 mb-2 border-gray-100 h-20 rounded-lg">
                <View>
                  <Text className="text-lg font-pmedium">Data</Text>
                  <Text>Aug 26 2024</Text>
                </View>
                <View>
                  <Text className="text-2xl">-$100</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default Home;
