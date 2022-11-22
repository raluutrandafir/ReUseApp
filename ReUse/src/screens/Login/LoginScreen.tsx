import React, { useRef } from 'react';
import { Text, ImageBackground, Pressable, Keyboard, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components';
import { Images } from '../../environment/Images';

import styles from './LoginScreen.style';
import { ReturnKey } from '../../components/Input/Input.types';
import { Routes } from '../../app/navigation';

interface FormValues {
    email: string;
    password: string;
}

const KEYBOARD_HEIGHT = 340;
const FORM_BOTTOM_OFFSET = 105;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function LoginScreen() {
    const passwordRef = useRef<TextInput>(null);

    const driver = useSharedValue(0);

    const navigation = useNavigation();

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const animatedStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: withSpring(
                        driver.value === 1 ? -KEYBOARD_HEIGHT + FORM_BOTTOM_OFFSET : 0,
                        { damping: 500, stiffness: 1000, mass: 3 }
                    )
                }
            ]
        }),
        []
    );

    function handleBlur() {
        driver.value = 0;
    }

    function handleFocus() {
        driver.value = 1;
    }

    function handleOutsidePress() {
        Keyboard.dismiss();
    }

    function handleSignUpPress() {
        navigation.navigate(Routes.Register);
    }

    return (
        <Pressable onPress={handleOutsidePress}>
            <ImageBackground
                source={Images.Login}
                imageStyle={styles.imageStyle}
                style={styles.screen}
            >
                <AnimatedPressable
                    style={[styles.content, animatedStyle]}
                    onPress={handleOutsidePress}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.tile}>Welcome</Text>
                        <Lottie
                            loop={true}
                            style={styles.animation}
                            autoPlay
                            renderMode="AUTOMATIC"
                            source={require('../../environment/welcome.json')}
                        />
                    </View>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email Required',
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Invalid Email'
                            }
                        }}
                        render={({ field: { value, onBlur, onChange } }) => (
                            <Input
                                description={errors.email?.message}
                                error={!!errors.email}
                                label="Email"
                                style={styles.input}
                                returnKeyType={ReturnKey.Next}
                                value={value}
                                onBlur={() => {
                                    handleBlur();
                                    onBlur();
                                }}
                                onChangeText={(text) => onChange(text.replace(/ /g, ''))}
                                onFocus={handleFocus}
                                onSubmit={() => {
                                    if (passwordRef.current) {
                                        passwordRef.current.focus();
                                    }
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Password Required'
                        }}
                        render={({ field: { value, onBlur, onChange } }) => (
                            <Input
                                description={errors.password?.message}
                                error={!!errors.password}
                                label="Password"
                                password
                                ref={passwordRef}
                                returnKeyType={ReturnKey.Done}
                                style={styles.input}
                                value={value}
                                onBlur={() => {
                                    handleBlur();
                                    onBlur();
                                }}
                                onChangeText={onChange}
                                onFocus={handleFocus}
                            />
                        )}
                    />
                    <Pressable style={styles.loginButton}>
                        <Text style={styles.button}>Log In</Text>
                    </Pressable>
                    <Text style={{ color: '#ABB28D' }}>
                        Don't have an account yet?
                        <Text style={{ fontWeight: '800' }} onPress={handleSignUpPress}>
                            {' '}
                            Sign Up
                        </Text>
                    </Text>
                </AnimatedPressable>
            </ImageBackground>
        </Pressable>
    );
}
