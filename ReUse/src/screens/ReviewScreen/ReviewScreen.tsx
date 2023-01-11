/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { RootStackParams, Routes } from '../../app/navigation';
import { Input } from '../../components';

export type ReviewScreenRouteType = RouteProp<RootStackParams, Routes.Review>;

export function ReviewScreen() {
    const route = useRoute<ReviewScreenRouteType>();
    const type = route.params.type;

    const navigation = useNavigation();

    function handleGoBackPress() {
        navigation.goBack();
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F9F8F6',
                paddingHorizontal: 24
            }}
        >
            <Pressable
                onPress={handleGoBackPress}
                style={{ position: 'absolute', top: 40, left: 10 }}
            >
                <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>Go back</Text>
            </Pressable>
            {type !== 'add' && (
                <Text
                    style={{
                        alignSelf: 'center',
                        marginTop: 60,
                        fontSize: 25,
                        fontWeight: '600',
                        color: '#ABB28D'
                    }}
                >
                    Title
                </Text>
            )}
            <View
                style={[
                    type === 'add' ? { marginTop: 84 } : { marginTop: 24 },
                    { width: '100%', height: 223, backgroundColor: '#EBE3D3' }
                ]}
            ></View>
            <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '500' }}>Product Title</Text>
            <Input
                value=""
                multiline
                style={{ marginTop: 12, width: '100%', height: 98, backgroundColor: '#D9D9D9' }}
            />
            {type === 'add' ? (
                <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '500' }}>
                    Product Description
                </Text>
            ) : (
                <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '500' }}>
                    Request Message
                </Text>
            )}
            <Input
                multiline
                value=""
                style={{ marginTop: 12, width: '100%', height: 123, backgroundColor: '#EBE3D3' }}
            />
            {type === 'add' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Post As Swap</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Post As Donation</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
