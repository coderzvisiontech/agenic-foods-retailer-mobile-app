import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Bottom Tab
import BottomTabNav from './Components/BottomTabNav';

//Screens
import { ConnectScreen, LoginScreen, RegisterScreen, OtpScreen } from '../Screens/Auth';
import SuccessScreen from '../Screens/SuccessScreen';
import { DetailScreen } from '../Screens/Profile/Component';
import OrderDeatils from '../Screens/Order';

const Stack = createNativeStackNavigator();
const options = { headerShown: false };

const ScreenRoutes = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="ConnectScreen"
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                    }}
                >
                    {/* Auth Screen */}
                    <Stack.Screen name="BottomTab" component={BottomTabNav} options={options} />
                    <Stack.Screen name="ConnectScreen" component={ConnectScreen} options={options} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={options} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={options} />
                    <Stack.Screen name="OtpScreen" component={OtpScreen} options={options} />

                    {/* Success Screen */}
                    <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={options} />

                    {/* Profile Screen */}
                    <Stack.Screen name='ProfileDetail' component={DetailScreen} options={options} />

                    {/* Order Screen */}
                    <Stack.Screen name='OrderDeatils' component={OrderDeatils} options={options} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default ScreenRoutes
