import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserTransactions } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Button from "../../components/Button";
import TransactionCards from "../../components/TransactionCards";
import EmptyState from "../../components/EmptyState";

const Transactions = () => {
  const { user } = useGlobalContext();
  const { data: userTransactions, refetch } = useAppWrite(() =>
    getUserTransactions(user.$id)
  );
  const [selectedTab, setSelectedTab] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    // Recall transactions -> If any new transactions
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="w-full h-full mt-8 px-4">
        <FlatList
           data={selectedTab === 'All' ? userTransactions.data : selectedTab === 'Income' ? userTransactions.income : userTransactions.expenses}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TransactionCards transactions={item}/>
          )}
          ListHeaderComponent={() => (
            <View className="w-full">
              <Text className="text-2xl font-pmedium mt-8">All Transactions</Text>
              <Text className="text-black-100">Here are all your transactions <Text className="font-psemibold">{user?.username}</Text></Text>

              <View className="flex-row justify-between mt-4">
                <Button
                  title="All"
                  containerStyles={`w-[100px] h-[45px] border border-gray-100 rounded-full ${selectedTab === "All" ? "bg-secondary" : "bg-white"}`}
                  textStyles={`font-pregular text-sm ${selectedTab === "All" ? "text-white" : "text-gray-100"}`}
                  handlePress={() => setSelectedTab("All")}
                />
                <Button
                  title="Income"
                  containerStyles={`w-[120px] h-[45px] border border-gray-100 rounded-full ${selectedTab === "Income" ? "bg-secondary" : "bg-white"}`}
                  textStyles={`font-pregular text-sm ${selectedTab === "Income" ? "text-white" : "text-gray-100"}`}
                  handlePress={() => setSelectedTab("Income")}
                />
                <Button
                  title="Expenses"
                  containerStyles={`w-[120px] h-[45px] border border-gray-100 rounded-full ${selectedTab === "Expenses" ? "bg-secondary" : "bg-white"}`}
                  textStyles={`font-pregular text-sm ${selectedTab === "Expenses" ? "text-white" : "text-gray-100"}`}
                  handlePress={() => setSelectedTab("Expenses")}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={<EmptyState title={`${selectedTab === 'All' ? 'No transaction at the moment' : selectedTab === 'Income' ? 'No income transaction at the moment' : 'No expense at the moment'} `} subtitle={`Log your ${selectedTab === 'All' ? 'transaction' : selectedTab === 'Income' ? 'income' : 'expense'} for the day!`}/>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
