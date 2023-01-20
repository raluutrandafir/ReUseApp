/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { Routes, RootStackParams } from '../../app/navigation';
import { Product } from '../../components/Product';
import { Footer } from '../../components/Footer';
import { RequestCard } from '../../components/RequestCard';
import { MessageCard } from '../../components/MessageCard';
import { useUserStore } from '../../store/useUserStore';
import { Icons } from '../../environment/Icons';

export type ProductsScreenRouteType = RouteProp<RootStackParams, Routes.ProductScreen>;

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface RequestInfo {
    id: string;
    productId: string;
}

interface responseProducts {
    id: string;
    title1: string;
    title2: string;
    description1: string;
    description2: string;
    image1: string;
    image2: string;
    isAvailable: boolean;
}

interface Request {
    productId: string;
    requestId: string;
    id: string;
    title1: string;
    title2: string;
    category: string;
    contactInfo: string;
    message: string;
    requestorId: string;
}

interface MessageInfo {
    id: string;
    productId: string;
    contactInfo: string;
    contactMessage: string;
    requestorId: string;
}

// dotnet run --urls "http://192.168.3.8:5000/"
// 63b582e21d4c50019372afd2
// const userID = '63b582e21d4c50019372afd2';
export function ProductScreen() {
    const route = useRoute<ProductsScreenRouteType>();

    const [options, setOptions] = useState<responseProducts[]>([]);
    const [myRequests, setMyRequests] = useState([]);
    const [myMessages, setMyMessages] = useState([]);
    const id = useRef<MessageInfo[]>([]);
    const requestId = useRef<RequestInfo[]>([]);
    const [title, setTitle] = useState('');
    const navigation = useNavigation();
    const [showPopUp, setShowPopUp] = useState(false);

    const userID = useUserStore((state) => state.userId);
    const userName = useUserStore((state) => state.userUsername);

    async function getProducts() {
        const response = await axios.get('http://192.168.3.8:5000/api/products/getallproducts', {
            params: { category: route.params.type, subcategory: route.params.optionId }
        });

        if (!response) {
            console.log('Error fetching Products');
            return;
        }

        // const response = await fetch('http://192.168.3.8:5000/Products/GetProducts', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'accept: text/plain',
        //         'Content-Type': 'application/json'
        //     }
        // });

        setOptions(response.data);
    }

    async function getRequestProduct(productId: string) {
        const result = await axios.get(
            'http://192.168.3.8:5000/api/products/getproductinformationforrequest',
            { params: { productId: productId } }
        );
        return result.data;
    }

    async function handleRequestPress() {
        setMyRequests([]);
        requestId.current = [];
        const response = await axios.get('http://192.168.3.8:5000/api/products/getrequests', {
            params: { userId: userID }
        });

        const requests = response.data;
        requests.map(async (item: Request) => {
            requestId.current.push({ id: item.id, productId: item.productId });
            const result = await getRequestProduct(item.productId);
            setMyRequests((myRequests) => [...myRequests, result]);
        });
    }

    useEffect(() => {
        if (myRequests) {
            setTitle('My Requests');
        }
    }, [myRequests]);

    useEffect(() => {
        if (myMessages) {
            setTitle('My Messages');
        }
    }, [myMessages]);

    async function handleMessagesPress() {
        setMyMessages([]);
        id.current = [];
        const response = await axios.get('http://192.168.3.8:5000/api/products/getmessages', {
            params: { userId: userID }
        });

        const messages = response.data;
        messages.map(async (item: Request) => {
            id.current.push({
                id: item.id,
                productId: item.productId,
                contactInfo: item.contactInfo,
                contactMessage: item.message,
                requestorId: item.requestorId
            });
            const result = await getRequestProduct(item.productId);
            setMyMessages((myMessages) => [...myMessages, result]);
        });
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

    function handleProfilePress() {
        setShowPopUp(!showPopUp);
    }

    function handlePlusPress() {
        navigation.navigate(Routes.Review, { type: 'add', optionId: route.params.optionId });
    }

    function handleLogoutPress() {
        navigation.navigate(Routes.Welcome);
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
    }, []);

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
                <Pressable
                    onPress={handleProfilePress}
                    style={{
                        position: 'absolute',
                        top: 40,
                        right: 0,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text>{userName}</Text>
                    <Icons.User style={{ marginRight: 20 }} />
                </Pressable>
                {showPopUp && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 80,
                            right: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F9F8F6',
                            height: 40,
                            width: 100,
                            zIndex: 100,
                            borderWidth: 1,
                            shadowOpacity: 1,
                            shadowOffset: { width: 1, height: 1 },
                            shadowColor: 'grey'
                        }}
                    >
                        <Pressable
                            onPress={handleLogoutPress}
                            style={{ width: '100%', alignItems: 'center' }}
                        >
                            <Text style={{ fontStyle: 'italic', fontWeight: '500' }}>Log Out</Text>
                        </Pressable>
                    </View>
                )}
                <Text style={{ marginTop: 60, fontSize: 25, fontWeight: '600', color: '#ABB28D' }}>
                    {title}
                </Text>
                {options && mainPage() && (
                    <ScrollView style={{ width: '100%' }}>
                        {options.map((item: responseProducts) => {
                            if (item.isAvailable) {
                                return (
                                    <Product
                                        key={item.id}
                                        type={route.params.type}
                                        title={item.title1}
                                        description={item.description1}
                                        image1={item.image1}
                                        productId={item.id}
                                        title2={item.title2}
                                        image2={item.image2}
                                        description2={item.description2}
                                    />
                                );
                            }
                        })}
                    </ScrollView>
                )}
                {title === 'My Requests' && myRequests && (
                    <ScrollView style={{ width: '100%' }}>
                        {myRequests.map((item: Request, index) => {
                            const reqId = requestId.current.find((d) => d.productId === item.id);

                            return (
                                <RequestCard
                                    key={index}
                                    title1={item.title1}
                                    title2={item.title2}
                                    type={item.category}
                                    requestId={reqId!.id}
                                />
                            );
                        })}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                )}
                {title === 'My Messages' && (
                    <ScrollView style={{ width: '100%' }}>
                        {myMessages.map((item: Request, index) => {
                            const messageId = id.current.find((d) => d.productId === item.id);
                            return (
                                <MessageCard
                                    key={index}
                                    messageId={messageId!.id}
                                    type={item.category}
                                    title1={item.title1}
                                    title2={item.title2}
                                    productId={item.id}
                                    contactInfo={messageId!.contactInfo}
                                    requestInfo={messageId!.contactMessage}
                                    requestorId={messageId!.requestorId}
                                />
                            );
                        })}
                        <View style={{ height: 100 }} />
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
