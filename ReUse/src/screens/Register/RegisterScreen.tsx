import React, { useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    Keyboard,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Lottie from 'lottie-react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components';
import { ReturnKey } from '../../components/Input/Input.types';

import styles from './RegisterScreen.styles';
import { Routes } from '../../app/navigation';
import axios from 'axios';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const KEYBOARD_HEIGHT = 340;
const FORM_BOTTOM_OFFSET = 5;

interface FormValues {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    phoneNumber: string;
    adress: string;
}

export function RegisterScreen() {
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const navigation = useNavigation();

    const driver = useSharedValue(0);

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const passworRepeatRef = useRef<TextInput>(null);
    const nameRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);

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

    const titleStyle = useAnimatedStyle(() => ({
        opacity: withTiming(!driver.value ? 1 : 0, { duration: 500 })
    }));

    async function onSubmit({ adress, email, name, password, phoneNumber }: FormValues) {
        const data = await axios
            .post('http://192.168.3.8:5000/api/user/register', {
                Username: name,
                Password: password,
                Email: email,
                Name: name,
                PhoneNumber: phoneNumber,
                Address: adress
            })
            .catch((error) => {
                console.error(error);
            });

        if (data) {
            reset();
            navigation.navigate(Routes.Login);
        }
    }

    function handleGoBackPress() {
        navigation.goBack();
    }

    function handleBlur() {
        driver.value = 0;
    }

    function handleFocus() {
        driver.value = 1;
    }

    function handleOutsidePress() {
        Keyboard.dismiss();
    }

    return (
        <>
            <View style={styles.screen}>
                <Pressable
                    onPress={handleGoBackPress}
                    style={{ position: 'absolute', top: 40, left: 10, zIndex: 10 }}
                >
                    <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>Go back</Text>
                </Pressable>
                <Lottie
                    loop={true}
                    style={styles.animation}
                    autoPlay
                    renderMode="AUTOMATIC"
                    source={require('../../environment/register.json')}
                />
                <AnimatedPressable
                    onPress={handleOutsidePress}
                    style={[styles.content, animatedStyle]}
                >
                    <ScrollView>
                        <Animated.Text style={[styles.description, titleStyle]}>
                            Create an Account
                        </Animated.Text>
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
                                    // description={errors.email?.message}
                                    error={!!errors.email}
                                    label="Email"
                                    ref={emailRef}
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
                                    // description={errors.password?.message}
                                    error={!!errors.password}
                                    label="Password"
                                    password
                                    ref={passwordRef}
                                    returnKeyType={ReturnKey.Next}
                                    style={styles.input}
                                    value={value}
                                    onBlur={() => {
                                        handleBlur();
                                        onBlur();
                                    }}
                                    onChangeText={onChange}
                                    onFocus={handleFocus}
                                    onSubmit={() => {
                                        if (passworRepeatRef.current) {
                                            passworRepeatRef.current?.focus();
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="repeatPassword"
                            rules={{
                                required: 'Password Required',
                                validate: (value) => value === getValues('password')
                            }}
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    // description={errors.repeatPassword?.message}
                                    error={!!errors.repeatPassword}
                                    label="Repeat Password"
                                    password
                                    ref={passworRepeatRef}
                                    returnKeyType={ReturnKey.Next}
                                    style={styles.input}
                                    value={value}
                                    onBlur={() => {
                                        handleBlur();
                                        onBlur();
                                    }}
                                    onChangeText={onChange}
                                    onFocus={handleFocus}
                                    onSubmit={() => {
                                        if (nameRef.current) {
                                            nameRef.current?.focus();
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    label="Name"
                                    value={value}
                                    style={styles.input}
                                    returnKeyType={ReturnKey.Next}
                                    onBlur={() => {
                                        handleBlur();
                                        onBlur();
                                    }}
                                    maxLength={15}
                                    ref={nameRef}
                                    onChangeText={onChange}
                                    onFocus={handleFocus}
                                    onSubmit={() => {
                                        if (phoneRef.current) {
                                            phoneRef.current?.focus();
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="phoneNumber"
                            rules={{
                                pattern: {
                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                    message: 'Invalid Phone Number'
                                }
                            }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Input
                                    // description={errors.phoneNumber?.message}
                                    error={!!errors.phoneNumber}
                                    label="Phone Number"
                                    maxLength={20}
                                    style={styles.input}
                                    value={value}
                                    ref={phoneRef}
                                    returnKeyType={ReturnKey.Next}
                                    onFocus={handleFocus}
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        onChange(text);
                                    }}
                                    onSubmit={() => {
                                        if (addressRef.current) {
                                            addressRef.current?.focus();
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="adress"
                            rules={{
                                required: 'Address Required'
                            }}
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    label="Adress (City, Country)"
                                    value={value}
                                    style={styles.input}
                                    // description={errors.adress?.message}
                                    error={!!errors.adress}
                                    returnKeyType={ReturnKey.Next}
                                    onBlur={() => {
                                        handleBlur();
                                        onBlur();
                                    }}
                                    ref={addressRef}
                                    onChangeText={onChange}
                                    onFocus={handleFocus}
                                />
                            )}
                        />
                        <AnimatedTouchable
                            onPress={handleSubmit(onSubmit)}
                            style={[{ width: 'auto' }, titleStyle]}
                        >
                            <Text style={styles.signIn}>Sign in</Text>
                        </AnimatedTouchable>
                    </ScrollView>
                </AnimatedPressable>
            </View>
        </>
    );
}
