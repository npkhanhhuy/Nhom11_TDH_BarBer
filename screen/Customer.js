import React from 'react';
import {View, Button} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RouterServices from '../routers/RouterServices';
import Setting from './Setting';
import Appoinent from './Appoinent';

const Tab = createBottomTabNavigator();
export default function Customer() {
  return (
    <Tab.Navigator initialRouteName="RouterServices"
    >
      <Tab.Screen
        name="RouterServices"
        component={RouterServices}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
          tabBarIcon: () => <Icon source={require('../asset/home.png')} color="#FF6666" size={26} />,
          tabBarLabelStyle: {color: '#FF6666', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appoinent}
        options={{
          tabBarLabel: 'Lịch hẹn',
          headerTitle:'Lịch hẹn',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source={require('../asset/appointment.png')} color="#FF6666" size={26} />,
          tabBarLabelStyle: {color: '#FF6666', fontSize: 13},
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Cài đặt',
          headerTitle:'Cài đặt',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTitleStyle: {color: 'white'},
          tabBarIcon: () => <Icon source={require('../asset/setting.png')} color="#FF6666" size={26} />,
          tabBarLabelStyle: {color: '#FF6666'},
        }}
      />
    </Tab.Navigator>
  );
}
