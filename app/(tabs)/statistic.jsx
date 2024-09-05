import { View, Text, ActivityIndicator,Dimensions  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { getUserTransactions } from '../../lib/appWrite';
import useAppWrite from '../../lib/useAppWrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import PureChart from 'react-native-pure-chart';

const Statistic = () => {
  const { user } = useGlobalContext();
  const { data: transactions, isLoading } = useAppWrite(() => getUserTransactions(user.$id));
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(isLoading);
  const screenWidth = Dimensions.get('window').width;

  const processTransactions = (transactions) => {
    const groupedData = {
        Income: {},
        Expenses: {},
    };

    transactions.forEach((transaction) => {
        const date = new Date(transaction.$createdAt).toLocaleDateString();
        const type = transaction.amount > 0 ? 'Income' : 'Expenses';

        if (!groupedData[type][date]) {
            groupedData[type][date] = 0;
        }

        groupedData[type][date] += transaction.amount;
    });

    const labels = Array.from(new Set(transactions.map(transaction => new Date(transaction.$createdAt).toLocaleDateString())));

    const incomeData = labels.map(date => ({
        x: date,
        y: groupedData['Income'][date] || 0
    }));
    const expensesData = labels.map(date => ({
        x: date,
        y: groupedData['Expenses'][date] || 0
    }));

    return [
        {
            seriesName: 'Income',
            data: incomeData,
            color: '#4CAF50', // Customize the color
        },
        {
            seriesName: 'Expenses',
            data: expensesData,
            color: '#F44336', // Customize the color
        }
    ];
};

  useEffect(() => {
    if (transactions.data) {
      try {
        const transactionData = processTransactions(transactions.data);
        setChartData(transactionData);
      } catch (err) {
        console.error('Error processing transactions:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [transactions.data]);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <View>
        
        <View className="mt-8 px-4">

        <Text className="text-2xl font-pmedium mt-8">Transactions Chart</Text>
        <Text className="text-black-100">Get a visualization of how you are spending your income</Text>
        
        <View className="mt-8">

      <PureChart data={chartData} type="line" width={screenWidth} />
         </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Statistic;
