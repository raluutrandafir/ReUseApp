import React from 'react';
import { Text, View } from 'react-native';

export function App() {
    return (
        <View
            style={[
                { backgroundColor: 'white', height: '100%', alignItems: 'center', marginTop: 400 }
            ]}
        >
            <Text style={[{ color: 'red' }]}>Hello</Text>
        </View>
    );
}
