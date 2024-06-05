import React from 'react';
import {View, Button} from 'react-native';
import {Icon, IconButton, Text,Image} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouterServices from '../routers/RouterServices';
import Transaction from './Transaction';
import Setting from './Setting';
import CustomerAdmin from './CustomerAdmin';

const Tab = createBottomTabNavigator();
export default function Admin() {
  return (
    <Tab.Navigator 
    initialRouteName="RouterServices"
    >
      <Tab.Screen
        name="RouterServices"
        component={RouterServices}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: () => <Icon source={require('../asset/home.png')} color="#FF6666" size={26} />,
          tabBarLabelStyle: {color: '#FF6666', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Đặt Lịch',
          headerTitle:'Danh sách khách hàng đăng ký',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source={require('../asset/cash.png')} color="#FF6666" size={26} />,
          tabBarLabelStyle: {color: '#FF6666', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerAdmin}
        options={{
          tabBarLabel: 'Khách Hàng',
          headerTitle:'Khách Hàng',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => (
            <Icon source={require('../asset/customer.png')} color="#FF6666" size={30} />
          ),
          tabBarLabelStyle: {color: '#FF6666'},
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Cài Đặt',
          headerTitle:'Cài Đặt',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source={require('../asset/setting.png')} color="#FF6666" size={26} />,
          tabBarLabelStyle: {color: '#FF6666'},
        }}
      />
    </Tab.Navigator>
  );
}
