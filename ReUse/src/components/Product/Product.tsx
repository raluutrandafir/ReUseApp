import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import { Images } from '../../environment/Images';

export function Product() {
    return (
        <View
            style={{
                height: 93,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <ImageBackground source={Images.Auto} style={{ width: 60, height: 80 }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text>TITLE</Text>
                    <Text>Description</Text>
                </View>
            </View>
        </View>
    );
}
