import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomBottomDrawer = ({ visible, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white p-6 rounded-t-3xl h-1/2">
          <View className="flex-row gap-4 mb-6 items-center">
            <TouchableOpacity onPress={onClose} className="p-3 rounded-full bg-white border border-gray-100 items-center justify-center">
              <Ionicons name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <View>
              <Text className="text-lg font-pmedium">
                Add a new Transaction
              </Text>
            </View>
          </View>
          <View
            className="w-full h-12 px-4  border border-gray-100 rounded-lg
       focus:border-secondary items-center flex-row space-x-4"
          >
            <TextInput
              className="flex-1 text-white mt-0.5 font-pregular text-base"
              value=""
              placeholder="Date"
              placeholderTextColor="#CDCDE0"
            />

            <Ionicons name="calendar-clear-outline" size={24} color="black" />
          </View>
          <View
            className="w-full h-12 px-4 mt-4 border border-gray-100 rounded-lg
       focus:border-secondary items-center flex-row space-x-4"
          >
            <TextInput
              className="flex-1 text-white mt-0.5 font-pregular text-base"
              value=""
              placeholder="Amount"
              placeholderTextColor="#CDCDE0"
            />

<Ionicons name="logo-usd" size={24} color="black" />
          </View>
          <View
            className="w-full h-12 px-4 mt-4 border border-gray-100 rounded-lg
       focus:border-secondary items-center flex-row space-x-4"
          >
            <TextInput
              className="flex-1 text-white mt-0.5 font-pregular text-base"
              value=""
              placeholder="Expenses Details"
              placeholderTextColor="#CDCDE0"
            />

<Ionicons name="create-outline" size={24} color="black" />
          </View>
          <View className="flex-row justify-between mt-8">
            <TouchableOpacity
              onPress={onClose}
              className="bg-blue-100 shadow-lg w-28 h-10 items-center justify-center rounded-lg"
            >
              <Text className="text-black text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="bg-secondary w-28 h-10 items-center justify-center  rounded-lg"
            >
              <Text className="text-white text-center">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomBottomDrawer;
