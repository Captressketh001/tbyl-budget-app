import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createTransaction } from "../lib/appWrite";
import { useGlobalContext } from "../context/GlobalProvider";

const CustomBottomDrawer = ({ visible, onClose }) => {
  const [form, setForm] = useState({
    date: new Date(),
    amount: 0,
    title: "",
  });
  const { user } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === "ios"); // Keep picker open on iOS
    setForm({ ...form, date: currentDate });
  };
  const submit = async () => {
    if (!form.date || !form.title || !form.amount) {
      return Alert.alert("Error", "Please fill all input field");
    }
    try {
      setIsSubmitting(true);
      console.log({ ...form });
      await createTransaction({ ...form, userId: user.$id });
      Alert.alert("Success", "Transaction created successfully!");
      onClose();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
      setForm({
        date: new Date(),
        title: "",
        amount: "",
      });
    }
  };
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
            <TouchableOpacity
              onPress={onClose}
              className="p-3 rounded-full bg-white border border-gray-100 items-center justify-center"
            >
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
              className="flex-1 text-black mt-0.5 font-pregular text-base"
              value={form.date.toDateString()}
              placeholder="Date"
              editable={false}
              placeholderTextColor="#CDCDE0"
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Ionicons name="calendar-clear-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {open && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
              style={{ backgroundColor: "black" }}
            />
          )}
          <View
            className="w-full h-12 px-4 mt-4 border border-gray-100 rounded-lg
       focus:border-secondary items-center flex-row space-x-4"
          >
            <TextInput
              className="flex-1 text-black mt-0.5 font-pregular text-base"
              value={form.amount}
              onChangeText={(e) => setForm({ ...form, amount: Number(e) })}
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
              className="flex-1 text-black mt-0.5 font-pregular text-base"
              value={form.title}
              onChangeText={(e) => setForm({ ...form, title: e })}
              placeholder="Expenses Details"
              placeholderTextColor="#CDCDE0"
            />

            <Ionicons name="create-outline" size={24} color="black" />
          </View>

          <View className="flex-row justify-between mt-8">
            <TouchableOpacity
              onPress={onClose}
              disabled={isSubmitting}
              className="bg-blue-100 shadow-lg w-28 h-10 items-center justify-center rounded-lg"
            >
              <Text className="text-black text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submit}
              disabled={isSubmitting}
              className="bg-secondary w-28 h-10 items-center justify-center  rounded-lg"
            >
              <Text className="text-white text-center">{isSubmitting ? 'Adding...': 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomBottomDrawer;
