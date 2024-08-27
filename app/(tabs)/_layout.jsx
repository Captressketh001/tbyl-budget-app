import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({icon, color, name, focused}) =>{
  return (
    <>
    {name === '' ? (
      <View className="items-center justify-center bg-secondary h-16 w-16 rounded-full">
      <Ionicons name={icon} size={25} color="#fff" className='w-6 h-6'  tintColor={color}  />
    
    </View>
    ) : (
      <View className="items-center justify-center gap-2">
      <Ionicons name={icon} size={25} color="#000" className=''  resizeMode='contain' tintColor={color}  />
      <Text className={`${focused ? 'font-pmedium': 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
    </View>
    )}
    </>
  )
}
const TabLayout = () => {
  return (
    <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor:'#000',
            tabBarInactiveTintColor: '#000',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#fff',
              height: 84,
            }
          }}
        >
            <Tabs.Screen 
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon:({color, focused}) =>(
                <TabIcon 
                  icon='home'
                  color={color}
                  name="Home"
                  focused={focused}
                />
              )
            }}
            />
             <Tabs.Screen 
            name="transactions"
            options={{
              title: 'Transactions',
              headerShown: false,
              tabBarIcon:({color, focused}) =>(
                <TabIcon 
                  icon='repeat'
                  color={color}
                  name="Transactions"
                  focused={focused}
                />
              )
            }}
            />
            <Tabs.Screen 
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon:({color, focused}) =>(
                <TabIcon 
                  icon='add'
                  color={color}
                  name=""
                  focused={focused}
                />
              )
            }}
            />
            <Tabs.Screen 
            name="statistic"
            options={{
              title: 'Statistics',
              headerShown: false,
              tabBarIcon:({color, focused}) =>(
                <TabIcon 
                  icon='stats-chart'
                  color={color}
                  name="Statistics"
                  focused={focused}
                />
              )
            }}
            />
            <Tabs.Screen 
            name="settings"
            options={{
              title: 'Settings',
              headerShown: false,
              tabBarIcon:({color, focused}) =>(
                <TabIcon 
                  icon='settings'
                  color={color}
                  name="Settings"
                  focused={focused}
                />
              )
            }}
            />
        </Tabs>
    </>
  )
}

export default TabLayout