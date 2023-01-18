/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icons } from '../../environment/Icons';
import { Routes } from '../../app/navigation';

interface Props {
    type: string;
    title1: string;
    title2: string;
    productId: string;
    messageId: string;
    contactInfo: string;
    requestInfo: string;
}

export function MessageCard({
    type,
    title1,
    title2,
    productId,
    messageId,
    contactInfo,
    requestInfo
}: Props) {
    const navigation = useNavigation();
    function handlePress(category: 'donation' | 'swap') {
        navigation.navigate(Routes.Review, {
            type: 'evaluate',
            category: category,
            productId: productId,
            messageId: messageId,
            requestMessage: requestInfo,
            contactInfo: contactInfo
        });
    }

    return type === 'Donations' ? (
        <Pressable
            style={{
                height: 96,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
            onPress={() => handlePress('donation')}
        >
            <View style={{ flexDirection: 'row' }}>
                <Icons.User />
                <Text style={{ marginVertical: 8 }}>username</Text>
                <Text style={{ marginLeft: 13, marginVertical: 8 }}> Requested a Donation</Text>
            </View>
            <View>
                <Text style={{ marginLeft: 12, fontWeight: '600', fontSize: 16 }}>{title1}</Text>
            </View>
        </Pressable>
    ) : (
        <Pressable
            style={{
                height: 150,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
            onPress={() => handlePress('swap')}
        >
            <View style={{ flexDirection: 'row' }}>
                <Icons.User />
                <Text style={{ marginVertical: 8 }}>username</Text>
                <Text style={{ marginLeft: 13, marginVertical: 8 }}> Requested an Exchange</Text>
            </View>
            <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                <View>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>{title1}</Text>
                </View>
                <Icons.SwapIcon
                    width={45}
                    height={20}
                    style={{ marginHorizontal: 20, alignSelf: 'center' }}
                />
                <View>
                    <Text style={{ marginVertical: 8, fontWeight: '600' }}>{title2}</Text>
                </View>
            </View>
        </Pressable>
    );
}
