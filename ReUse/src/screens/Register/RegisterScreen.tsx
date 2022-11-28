import React from 'react';
import { InputAccessoryView, ScrollView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Lottie from 'lottie-react-native';

import { Input } from '../../components';
import { ReturnKey } from '../../components/Input/Input.types';

import styles from './RegisterScreen.styles';

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
        setValue
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function handleBlur() {}

    function handleFocus() {}

    return (
        <>
            <View style={styles.screen}>
                <Lottie
                    loop={true}
                    style={styles.animation}
                    autoPlay
                    renderMode="AUTOMATIC"
                    source={require('../../environment/register.json')}
                />
                <InputAccessoryView style={{ width: '100%' }}>
                    <ScrollView style={styles.content}>
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
                                    returnKeyType={ReturnKey.Next}
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
                        <Controller
                            control={control}
                            name="repeatPassword"
                            rules={{
                                required: 'Password Required'
                            }}
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    description={errors.password?.message}
                                    error={!!errors.password}
                                    label="Repeat Password"
                                    password
                                    returnKeyType={ReturnKey.Next}
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
                                    onChangeText={onChange}
                                    onFocus={handleFocus}
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
                                    description={errors.phoneNumber?.message}
                                    error={!!errors.phoneNumber}
                                    label="Phone Number"
                                    maxLength={20}
                                    style={styles.input}
                                    value={value}
                                    returnKeyType={ReturnKey.Next}
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        onChange(text);
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="adress"
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    label="Adress (City, Country)"
                                    value={value}
                                    style={styles.input}
                                    returnKeyType={ReturnKey.Next}
                                    onBlur={() => {
                                        handleBlur();
                                        onBlur();
                                    }}
                                    onChangeText={onChange}
                                    onFocus={handleFocus}
                                />
                            )}
                        />
                    </ScrollView>
                </InputAccessoryView>
            </View>
        </>
    );
}
