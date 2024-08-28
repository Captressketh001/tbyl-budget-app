import { View, Text } from "react-native";
import React from "react";
import { formatDate, formatAmount } from "../utils";

const TransactionCards = ({ transactions: {title, amount, date}}) => {
  

  return (
    <View className="mt-4">
      <View className="border flex-row justify-between items-center px-6 mb-2 border-gray-100 h-20 rounded-lg">
        <View>
          <Text className="text-lg font-pmedium">{title}</Text>
          <Text>{formatDate(date)}</Text>
        </View>
        <View>
          <Text className={`text-2xl ${amount > 0 ? 'text-[#38a169]' : 'text-black-100'} `}>{formatAmount(amount)}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCards;
