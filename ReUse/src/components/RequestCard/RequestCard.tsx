/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

import { Icons } from '../../environment/Icons';

interface Props {
    type: string;
}

export function RequestCard({ type }: Props) {
    return type === 'donations' ? (
        <View
            style={{
                height: 91,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <View>
                <Text style={{ marginVertical: 8, marginLeft: 4 }}>Dontaion</Text>
                <Text style={{ marginLeft: 12, fontWeight: '600', fontSize: 16 }}>
                    Product Title
                </Text>
            </View>
        </View>
    ) : (
        <View
            style={{
                height: 91,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <Text style={{ marginLeft: 13, marginVertical: 4 }}>Exchange</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>TITLE</Text>
                </View>
                <Icons.SwapIcon width={45} style={{ marginHorizontal: 20 }} />
                <View>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>TITLE</Text>
                </View>
            </View>
        </View>
    );
}
