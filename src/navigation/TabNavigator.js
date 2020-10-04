import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {DepositStackScreen, HomeStackScreen, ProfileStackScreen, SpendStackScreen} from "./StackNavigator";


const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#eec971"
        barStyle={{backgroundColor: '#3a3838'}}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-home" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Deposit"
            component={DepositStackScreen}
            options={{
                tabBarLabel: 'Earn',
                tabBarIcon: ({color}) => (
                    <Icon name="arrow-down-circle-outline" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Spend"
            component={SpendStackScreen}
            options={{
                tabBarLabel: 'Spend',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-send" color={color} size={26}/>
                ),
            }}
        />
    </Tab.Navigator>
);

export default TabNavigator;

