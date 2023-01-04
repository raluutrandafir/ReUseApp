import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';

import { Product } from '../../components/Product';

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 86.123.250.155
export function ProductScreen() {
    async function getProducts() {
        // const respone = await axios.get('https://86.123.250.155:7289/api/Products/GetProducts');

        const response = await fetch('http://86.123.250.155:7289/Products/GetProducts', {
            method: 'GET',
            headers: {
                Accept: 'accept: text/plain',
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red',
                alignItems: 'center',
                paddingHorizontal: 24
            }}
        >
            <Text style={{ marginTop: 60 }}>Title</Text>
            <ScrollView style={{ width: '100%' }}>
                {mock.map((item) => (
                    <Product key={item} />
                ))}
            </ScrollView>
        </View>
    );
}
