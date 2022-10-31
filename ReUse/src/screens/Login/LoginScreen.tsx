import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { Input } from '../../components';
import { Images } from '../../environment/Images';

import styles from './LoginScreen.style';

export function LoginScreen() {
    return (
        <ImageBackground source={Images.Login} imageStyle={styles.imageStyle} style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.tile}>Welcome</Text>
                <Input value="0" />
            </View>
        </ImageBackground>
    );
}
