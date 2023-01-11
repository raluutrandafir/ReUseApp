import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { WelcomeScreen } from '../screens/welcome';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';
import { Routes } from './navigation';
import { ChooseScreen } from '../screens/Choose';
import { ProductScreen } from '../screens/ProductScreen/ProductScreen';
import { UserProvider } from '../context/UserContext';
import { ReviewScreen } from '../screens/ReviewScreen/ReviewScreen';

const RootStack = createNativeStackNavigator();

export function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <SafeAreaProvider>
                    <RootStack.Navigator
                        screenOptions={{
                            animationTypeForReplace: 'push',
                            headerShown: false
                        }}
                    >
                        <RootStack.Screen
                            name={Routes.Welcome}
                            children={() => <WelcomeScreen type="Welcome" />}
                        />
                        <RootStack.Screen name={Routes.Login} children={() => <LoginScreen />} />
                        <RootStack.Screen
                            name={Routes.Register}
                            children={() => <RegisterScreen />}
                        />
                        <RootStack.Screen
                            name={Routes.Choose}
                            children={() => <WelcomeScreen type="Choose" />}
                        />
                        <RootStack.Screen
                            name={Routes.ChooseScreen}
                            children={() => <ChooseScreen />}
                        />
                        <RootStack.Screen
                            name={Routes.ProductScreen}
                            children={() => <ProductScreen />}
                        />
                        <RootStack.Screen name={Routes.Review} children={() => <ReviewScreen />} />
                    </RootStack.Navigator>
                </SafeAreaProvider>
            </NavigationContainer>
            <Toast position="bottom" autoHide visibilityTime={5000} />
        </UserProvider>
    );
}
