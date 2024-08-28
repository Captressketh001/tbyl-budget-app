import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../../components/Button";
import { getAllLatestTransactions } from "../../lib/appWrite";
import { getAllLatestExpense } from "../../lib/appWrite";
import { getAllLatestIncome } from "../../lib/appWrite";
import { getUserTransactions } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import TransactionCards from "../../components/TransactionCards";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import { formatAmount } from "../../utils";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: transactions, refetch } = useAppWrite(() =>
    getAllLatestTransactions(user.$id)
  );
  const { data: userTransactions } = useAppWrite(() =>
    getUserTransactions(user.$id)
  );
  const { data: income } = useAppWrite(() => getAllLatestIncome(user.$id));
  const { data: expense } = useAppWrite(() => getAllLatestExpense(user.$id));
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
          data={
            selectedTab === "All"
              ? transactions
              : selectedTab === "Income"
                ? income
                : expense
          }
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <TransactionCards transactions={item} />}
          ListHeaderComponent={() => (
            <View className="w-full">
              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}
                className="w-full h-60 rounded-3xl"
                colors={["#FF5C75", "#9B64EE"]}
              >
                <View className="m-4">
                  <View className="mt-3">
                    <Text className="text-2xl text-white font-pmedium">
                      Total balance
                    </Text>
                  </View>
                  <View>
                    <Text className="text-[40px] text-white font-pmedium mt-2">
                      { formatAmount(Number(userTransactions?.balance)) ?? formatAmount(0)}
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center mt-4">
                    <View className="flex-row items-center gap-2">
                      <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                        <Ionicons
                          name="chevron-down-circle-outline"
                          size={24}
                          color="#FF5C75"
                        />
                      </View>
                      <View>
                        <Text className="text-lg text-white">Expenses</Text>
                        <Text className="text-lg text-white">
                          {formatAmount(Number(userTransactions?.totalExpense)) ?? formatAmount(0)}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                        <Ionicons
                          name="chevron-up-circle-outline"
                          size={24}
                          color="#38a169"
                        />
                      </View>
                      <View>
                        <Text className="text-lg text-white">Income</Text>
                        <Text className="text-lg text-white">
                          {formatAmount(Number(userTransactions?.totalIncome)) ?? formatAmount(0)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </LinearGradient>
              <Text className="text-2xl font-pmedium mt-8">
                Recent Transactions
              </Text>

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
          ListEmptyComponent={
            <EmptyState
              title={`${selectedTab === "All" ? "No transaction at the moment" : selectedTab === "Income" ? "No income transaction at the moment" : "No expense at the moment"} `}
              subtitle={`Log your ${selectedTab === "All" ? "transaction" : selectedTab === "Income" ? "income" : "expense"} for the day!`}
            />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      </View>
    </SafeAreaView>
    // <SafeAreaView className="h-full bg-white">
    //   {/* <ScrollView> */}
    //   <View className="w-full h-full mt-8 px-4">
    //     <LinearGradient
    //       start={{ x: 0.0, y: 0.0 }}
    //       end={{ x: 1.0, y: 1.0 }}
    //       className="w-full h-60 rounded-3xl"
    //       colors={["#FF5C75", "#9B64EE"]}
    //     >
    //       <View className="m-4">
    //         <View className="mt-3">
    //           <Text className="text-2xl text-white font-pmedium">
    //             Total balance
    //           </Text>
    //         </View>
    //         <View>
    //           <Text className="text-[40px] text-white font-pmedium mt-2">
    //             {formatAmount(userTransactions?.balance) ?? 0}
    //           </Text>
    //         </View>

    //         <View className="flex-row justify-between items-center mt-4">
    //           <View className="flex-row items-center gap-2">
    //             <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
    //               <Ionicons
    //                 name="chevron-down-circle-outline"
    //                 size={24}
    //                 color="#FF5C75"
    //               />
    //             </View>
    //             <View>
    //               <Text className="text-lg text-white">Expenses</Text>
    //               <Text className="text-lg text-white">{formatAmount(userTransactions?.totalExpense) ?? 0}</Text>
    //             </View>
    //           </View>
    //           <View className="flex-row items-center gap-2">
    //             <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
    //               <Ionicons
    //                 name="chevron-up-circle-outline"
    //                 size={24}
    //                 color="#38a169"
    //               />
    //             </View>
    //             <View>
    //               <Text className="text-lg text-white">Income</Text>
    //               <Text className="text-lg text-white">{formatAmount(userTransactions?.totalIncome) ?? 0}</Text>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </LinearGradient>

    //     <View className="mt-8">
    //       <Text className="text-2xl font-pmedium">Recent Transactions</Text>

    //       <View className="flex-row justify-between mt-4">
    //         <Button
    //           title="All"
    //           containerStyles={`w-[100px] h-[45px] border border-gray-100 rounded-full ${selectedTab === "All" ? "bg-secondary" : "bg-white"}`}
    //           textStyles={`font-pregular text-sm ${selectedTab === "All" ? "text-white" : "text-gray-100"}`}
    //           handlePress={() => setSelectedTab("All")}
    //         />
    //         <Button
    //           title="Income"
    //           containerStyles={`w-[120px] h-[45px] border border-gray-100 rounded-full ${selectedTab === "Income" ? "bg-secondary" : "bg-white"}`}
    //           textStyles={`font-pregular text-sm ${selectedTab === "Income" ? "text-white" : "text-gray-100"}`}
    //           handlePress={() => setSelectedTab("Income")}
    //         />
    //         <Button
    //           title="Expenses"
    //           containerStyles={`w-[120px] h-[45px] border border-gray-100 rounded-full ${selectedTab === "Expenses" ? "bg-secondary" : "bg-white"}`}
    //           textStyles={`font-pregular text-sm ${selectedTab === "Expenses" ? "text-white" : "text-gray-100"}`}
    //           handlePress={() => setSelectedTab("Expenses")}
    //         />
    //       </View>

    //       {selectedTab === "All" && (
    //         <FlatList
    //           data={transactions}
    //           keyExtractor={(item) => item.$id}
    //           renderItem={({ item }) => (
    //             <TransactionCards transactions={item} />
    //           )}
    //           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    //         />
    //       )}
    //       {selectedTab === "Income" && (
    //         <FlatList
    //           data={income}
    //           keyExtractor={(item) => item.$id}
    //           renderItem={({ item }) => (
    //             <TransactionCards transactions={item} />
    //           )}
    //         />
    //       )}
    //       {selectedTab === "Expenses" && (
    //         <FlatList
    //           data={expense}
    //           keyExtractor={(item) => item.$id}
    //           renderItem={({ item }) => (
    //             <TransactionCards transactions={item} />
    //           )}
    //           ListEmptyComponent={<EmptyState title='No expense at the moment' subtitle="Log your expense for the day!"/>}
    //         />
    //       )}
    //     </View>
    //   </View>
    //   {/* </ScrollView> */}
    // </SafeAreaView>
  );
};

export default Home;
