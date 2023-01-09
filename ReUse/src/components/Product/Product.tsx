import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import { Icons } from '../../environment/Icons';
import { Images } from '../../environment/Images';

interface Props {
    type: string;
}

export function Product({ type }: Props) {
    return type === 'donations' ? (
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
                <ImageBackground
                    source={Images.Auto}
                    style={{ width: 80, height: 80, marginTop: 4, marginLeft: 6 }}
                />
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>TITLE</Text>
                    <Text style={{ marginLeft: 12 }}>Description</Text>
                </View>
            </View>
        </View>
    ) : (
        <View
            style={{
                height: 170,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <ImageBackground
                        source={Images.Auto}
                        style={{ width: 120, height: 94, marginTop: 4, marginLeft: 6 }}
                    />
                    <Text style={{ marginLeft: 13, marginVertical: 8, fontWeight: '600' }}>
                        TITLE
                    </Text>
                    <Text style={{ marginLeft: 13 }}>Description</Text>
                </View>
                <Icons.SwapIcon width={45} style={{ marginTop: 35, marginHorizontal: 20 }} />
                <View>
                    <ImageBackground
                        source={Images.Auto}
                        style={{ width: 120, height: 94, marginTop: 4, marginLeft: 6 }}
                    />
                    <Text style={{ marginLeft: 13, marginVertical: 8, fontWeight: '600' }}>
                        TITLE
                    </Text>
                    <Text style={{ marginLeft: 13 }}>Description</Text>
                </View>
            </View>
        </View>
    );
}
