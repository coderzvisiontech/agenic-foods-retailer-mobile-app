import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductList from '../../../Screens/ProductList';
import NotificationScreen from '../../../Screens/Notifications';
import CartScreen from '../../../Screens/Cart';
import ProfileScreen from '../../../Screens/Profile';
import { FOOTER_MENU } from '../../../Interface';
import { ColorPalatte, FontSize } from '../../../Themes';
const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                const menuItem = FOOTER_MENU.find(item => item.name === route.name);
                return {
                    tabBarIcon: ({ focused }) => {
                        return focused ? menuItem.activeIcon : menuItem.icon;
                    },
                    tabBarActiveTintColor: ColorPalatte.primaryClr,
                    tabBarInactiveTintColor: ColorPalatte.grey_300,
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontFamily: 'Outfit-Regular',
                        fontSize: FontSize.fontSize12,
                    },
                    tabBarStyle: {
                        backgroundColor: ColorPalatte.whiteClr,
                        height: 55,
                    },
                };
            }}
        >
            <Tab.Screen name="Home" component={ProductList} />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNav;
