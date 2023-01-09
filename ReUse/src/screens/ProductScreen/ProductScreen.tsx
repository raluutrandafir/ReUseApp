import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Routes, RootStackParams } from '../../app/navigation';

import { Product } from '../../components/Product';

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

    async function getProducts() {
        const response = await axios.get('http://192.168.3.8:5000/Products/GetAllProducts', {
            params: { category: route.params.type, subcategory: route.params.optionId }
        });

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

    useEffect(() => {
        getProducts();
    });

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                backgroundColor: '#F9F8F6',
                paddingHorizontal: 24
            }}
        >
            {route.params.type === 'donations' ? (
                <Text style={{ marginTop: 60, fontSize: 25, fontWeight: '600', color: '#ABB28D' }}>
                    Donations
                </Text>
            ) : (
                <Text style={{ marginTop: 60, fontSize: 25, fontWeight: '600', color: '#ABB28D' }}>
                    Swaps
                </Text>
            )}
            <ScrollView style={{ width: '100%' }}>
                {options?.map((item) => (
                    <Product key={item.id} type={route.params.type} />
                ))}
            </ScrollView>
        </View>
    );
}
