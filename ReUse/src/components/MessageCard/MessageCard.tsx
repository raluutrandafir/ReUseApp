/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icons } from '../../environment/Icons';
import { Routes } from '../../app/navigation';

interface Props {
    type: string;
}

export function MessageCard({ type }: Props) {
    const navigation = useNavigation();

    function handlePress() {
        navigation.navigate(Routes.Review, { type: 'message' });
    }

    return type === 'donations' ? (
        <Pressable
            style={{
                height: 96,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <Icons.User />
                <Text style={{ marginVertical: 8 }}>username</Text>
                <Text style={{ marginLeft: 13, marginVertical: 8 }}> Requested a Donation</Text>
            </View>
            <View>
                <Text style={{ marginLeft: 12, fontWeight: '600', fontSize: 16 }}>
                    Product Title
                </Text>
            </View>
        </Pressable>
    ) : (
        <Pressable
            style={{
                height: 96,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
            onPress={handlePress}
        >
            <View style={{ flexDirection: 'row' }}>
                <Icons.User />
                <Text style={{ marginVertical: 8 }}>username</Text>
                <Text style={{ marginLeft: 13, marginVertical: 8 }}> Requested an Exchange</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>TITLE</Text>
                </View>
                <Icons.SwapIcon width={45} style={{ marginHorizontal: 20 }} />
                <View>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>TITLE</Text>
                </View>
            </View>
        </Pressable>
    );
}
