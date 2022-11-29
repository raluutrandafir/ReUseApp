import React from 'react';
import { Text, View, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { Images } from '../../environment/Images';

import styles from './WelcomeScreen.styles';
import { Routes } from '../../app/navigation';

interface Props {
    type: 'Welcome' | 'Choose';
}

export function WelcomeScreen({ type = 'Welcome' }: Props) {
    const navigation = useNavigation();

    function handleTitlePress() {
        navigation.navigate(Routes.Login);
    }

    function handleSignInPress() {
        navigation.navigate(Routes.Register);
    }

    const description =
        type === 'Welcome' ? 'Making the world a cleaner place.' : 'Choose your way';

    return (
        <View style={styles.screen}>
            <ImageBackground source={Images.Welcome} imageStyle={styles.imageStyle} />
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{description}</Text>
            </View>
            {type === 'Welcome' ? (
                <>
                    <Pressable onPress={handleTitlePress}>
                        <Text style={styles.title}>Reuse</Text>
                    </Pressable>
                    <Pressable onPress={handleSignInPress}>
                        <Text style={styles.signIn}>Sign in</Text>
                    </Pressable>
                </>
            ) : (
                <View style={styles.cardsContainer}>
                    <Pressable style={styles.card}>
                        <Text style={styles.cardTitle}>Donations</Text>
                        <Lottie
                            loop={true}
                            style={{ marginTop: 10 }}
                            autoPlay
                            renderMode="AUTOMATIC"
                            source={require('../../environment/piggy.json')}
                        />
                    </Pressable>
                    <Pressable style={styles.card}>
                        <Text style={styles.cardTitle}>Swaps</Text>
                        <Lottie
                            loop={true}
                            style={{ marginTop: 10 }}
                            autoPlay
                            renderMode="AUTOMATIC"
                            source={require('../../environment/swap.json')}
                        />
                    </Pressable>
                </View>
            )}
        </View>
    );
}
