// ./navigation/StackNavigator.js

import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ScanNewCard from "../screens/cards/ScanNewCard";
import AllCards from "../screens/cards/AllCards";
import Icon from "react-native-vector-icons/Ionicons";
import EarnScreen from "../screens/EarnScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MakePayment from "../screens/payments/MakePayment";
import AddNewCard from "../screens/cards/AddNewCard";
import AllTxsScreen from "../screens/AllTxsScreen";
import DetailScreen from "../screens/DetailScreen";
import SpendScreen from "../screens/SpendScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const HomeStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
            title: 'Binusu Loyalty',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            )
        }}/>

        <Stack.Screen name="AllCards" component={AllCards} options={{
            title: 'Programs',
        }}/>

        <Stack.Screen name="NewCardScreen" component={ScanNewCard} options={{
            title: 'Create card',
        }}/>

        <Stack.Screen name="AddNewCard" component={AddNewCard} options={{
            title: 'New Card',
        }}/>

        <Stack.Screen name="MakePayment" component={MakePayment} options={{
            title: 'Make Payment',
        }}/>

        <Stack.Screen name="DetailScreen" component={DetailScreen} options={({route, navigation}) => ({
            title: route.params.name
        })}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
            title: 'Profile',
            headerShown: false,
        }}/>

    </Stack.Navigator>
);

const DepositStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        title: 'Earn'
    }}>
        <Stack.Screen name="Deposit" component={EarnScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            )
        }}/>
    </Stack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            ),
            headerShown: false,
        }}/>
    </Stack.Navigator>
);

const SpendStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <Stack.Screen name="Spend" component={SpendScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            ),
            // headerShown: false,
        }}/>
    </Stack.Navigator>
);

export {HomeStackScreen, DepositStackScreen, ProfileStackScreen, SpendStackScreen};
