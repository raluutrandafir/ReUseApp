import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';

import { Product } from '../../components/Product';

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// dotnet run --urls "http://192.168.3.8:5000/"
export function ProductScreen() {
    async function getProducts() {
        const response = await axios.get('http://192.168.3.8:5000/Products/GetProducts');

        // const response = await fetch('http://192.168.3.8:5000/Products/GetProducts', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'accept: text/plain',
        //         'Content-Type': 'application/json'
        //     }
        // });
        console.log(response.data);
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
