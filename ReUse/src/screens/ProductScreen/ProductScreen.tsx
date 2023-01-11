/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { Routes, RootStackParams } from '../../app/navigation';
import { Product } from '../../components/Product';
import { Footer } from '../../components/Footer';
import { RequestCard } from '../../components/RequestCard';
import { MessageCard } from '../../components/MessageCard';

export type ProductsScreenRouteType = RouteProp<RootStackParams, Routes.ProductScreen>;

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Products {
    title: number;
    description: string;
    category: string;
    subcategory: string;
    isAvailable: boolean;
}

// dotnet run --urls "http://192.168.3.8:5000/"
export function ProductScreen() {
    const route = useRoute<ProductsScreenRouteType>();

    const [options, setOptions] = useState<Products>();
    const [myRequests, setMyRequests] = useState();
    const [title, setTitle] = useState('');
    const navigation = useNavigation();

    async function getProducts() {
        const response = await axios.get('http://192.168.3.8:5000/Products/GetAllProducts', {
            params: { category: route.params.type, subcategory: route.params.optionId }
        });

        if (!response) {
            Toast.show({ type: 'error', text1: 'Error Getting Data' });
            return;
        }

        // const response = await fetch('http://192.168.3.8:5000/Products/GetProducts', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'accept: text/plain',
        //         'Content-Type': 'application/json'
        //     }
        // });

        console.log(response);
        setOptions(response.data);
    }

    async function getRequests() {
        return [1, 2];
    }

    function handleRequestPress() {
        setTitle('My Requests');
        const requests = getRequests();
    }

    function handleMessagesPress() {
        setTitle('My Messages');
        const requests = getRequests();
    }

    function handleGoBackPress() {
        if (title === 'My Requests' || title === 'My Messages') {
            if (route.params.type === 'donations') {
                setTitle('Donations');
                return;
            }

            setTitle('Swaps');
            return;
        }

        navigation.goBack();
    }

    function handlePlusPress() {
        navigation.navigate(Routes.Review, { type: 'add' });
    }

    function mainPage() {
        if (title === 'Donations') {
            return true;
        }

        if (title === 'Swaps') {
            return true;
        }

        return false;
    }

    useEffect(() => {
        function getTitle() {
            if (route.params.type === 'donations') {
                return 'Donations';
            }

            return 'Swaps';
        }

        const string = getTitle();
        setTitle(string);
    }, [route.params.type]);

    useEffect(() => {
        getProducts();
    });

    return (
        <>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    backgroundColor: '#F9F8F6',
                    paddingHorizontal: 24
                }}
            >
                <Pressable
                    onPress={handleGoBackPress}
                    style={{ position: 'absolute', top: 40, left: 10 }}
                >
                    <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>Go back</Text>
                </Pressable>
                <Text style={{ marginTop: 60, fontSize: 25, fontWeight: '600', color: '#ABB28D' }}>
                    {title}
                </Text>
                {options && mainPage() && (
                    <ScrollView style={{ width: '100%' }}>
                        {options.map((item) => (
                            <Product key={item.id} type={route.params.type} />
                        ))}
                    </ScrollView>
                )}
                {title === 'My Requests' && (
                    <ScrollView style={{ width: '100%' }}>
                        {mock.map((item) => (
                            <RequestCard type={'donations'} />
                        ))}
                    </ScrollView>
                )}
                {title === 'My Messages' && (
                    <ScrollView style={{ width: '100%' }}>
                        {mock.map((item) => (
                            <MessageCard type={'swaps'} />
                        ))}
                    </ScrollView>
                )}
            </View>
            <Footer
                onRequestPress={handleRequestPress}
                onMessagesPress={handleMessagesPress}
                onPlusPress={handlePlusPress}
            />
        </>
    );
}
