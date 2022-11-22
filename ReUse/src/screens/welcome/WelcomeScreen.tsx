import React from 'react';
import { Text, View, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Images } from '../../environment/Images';

import styles from './WelcomeScreen.styles';
import { Routes } from '../../app/navigation';

export function WelcomeScreen() {
    const navigation = useNavigation();

    function handleTitlePress() {
        navigation.navigate(Routes.Login);
    }

    function handleSignInPress() {
        navigation.navigate(Routes.Login);
    }

    return (
        <View style={styles.screen}>
            <ImageBackground source={Images.Welcome} imageStyle={styles.imageStyle} />
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>Making the world a cleaner place.</Text>
            </View>
            <Pressable onPress={handleTitlePress}>
                <Text style={styles.title}>Reuse</Text>
            </Pressable>
            <Pressable onPress={handleSignInPress}>
                <Text style={styles.signIn}>Sign in</Text>
            </Pressable>
        </View>
    );
}
