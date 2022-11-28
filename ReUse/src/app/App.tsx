import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WelcomeScreen } from '../screens/welcome';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';
import { Routes } from './navigation';

const RootStack = createNativeStackNavigator();

export function App() {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <RootStack.Navigator
                    screenOptions={{
                        animationTypeForReplace: 'push',
                        headerShown: false
                    }}
                >
                    <RootStack.Screen name={Routes.Welcome} children={() => <WelcomeScreen />} />
                    <RootStack.Screen name={Routes.Login} children={() => <LoginScreen />} />
                    <RootStack.Screen name={Routes.Register} children={() => <RegisterScreen />} />
                </RootStack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}
