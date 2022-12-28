import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Product } from '../../components/Product';

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function ProductScreen() {
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
