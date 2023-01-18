/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Routes } from '../../app/navigation';

import { Icons } from '../../environment/Icons';
import { Images } from '../../environment/Images';

interface Props {
    type: string;
    title: string;
    title2: string;
    description: string;
    description2: string;
    image1: string;
    image2: string;
    productId: string;
}

export function Product({
    type,
    title,
    description,
    image1,
    productId,
    title2,
    description2,
    image2
}: Props) {
    const navigation = useNavigation();

    function handleRequestPress(category: 'swap' | 'donation') {
        navigation.navigate(Routes.Review, {
            type: 'submit',
            productId: productId,
            category: category
        });
    }

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
                {image1 ? (
                    <ImageBackground
                        source={{
                            uri: image1
                        }}
                        style={{ width: 80, height: 80, marginTop: 4, marginLeft: 6 }}
                    />
                ) : (
                    <ImageBackground
                        source={{
                            uri: 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'
                        }}
                        style={{ width: 80, height: 80, marginTop: 4, marginLeft: 6 }}
                    />
                )}
                <View
                    style={{
                        flexDirection: 'column'
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{ marginVertical: 8, fontWeight: '600', marginLeft: 8, width: 200 }}
                    >
                        {title}
                    </Text>
                    <Text numberOfLines={2} style={{ marginLeft: 12 }}>
                        {description}
                    </Text>
                </View>
                <Pressable
                    onPress={() => handleRequestPress('donation')}
                    style={{
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 4
                    }}
                >
                    <Text>Request</Text>
                    <Icons.Heart style={{ marginLeft: 5 }} />
                </Pressable>
            </View>
        </View>
    ) : (
        <View
            style={{
                height: 190,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 130 }}>
                    {image1 ? (
                        <ImageBackground
                            source={{
                                uri: image1
                            }}
                            style={{ width: 120, height: 94, marginTop: 4, marginLeft: 6 }}
                        />
                    ) : (
                        <ImageBackground
                            source={{
                                uri: 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'
                            }}
                            style={{ width: 120, height: 94, marginTop: 4, marginLeft: 6 }}
                        />
                    )}
                    <Text
                        numberOfLines={1}
                        style={{ marginLeft: 13, marginVertical: 8, fontWeight: '600' }}
                    >
                        {title}
                    </Text>
                    <Text numberOfLines={1} style={{ marginLeft: 13 }}>
                        {description}
                    </Text>
                </View>
                <Icons.SwapIcon width={45} style={{ marginTop: 35, marginHorizontal: 15 }} />
                <View style={{ width: 130 }}>
                    {image2 ? (
                        <ImageBackground
                            source={{
                                uri: image2
                            }}
                            style={{ width: 120, height: 94, marginTop: 4, marginLeft: 6 }}
                        />
                    ) : (
                        <ImageBackground
                            source={{
                                uri: 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'
                            }}
                            style={{ width: 120, height: 94, marginTop: 4, marginLeft: 6 }}
                        />
                    )}
                    <Text
                        numberOfLines={1}
                        style={{ marginLeft: 13, marginVertical: 8, fontWeight: '600' }}
                    >
                        {title2}
                    </Text>
                    <Text numberOfLines={1} style={{ marginLeft: 13 }}>
                        {description2}
                    </Text>
                    <Pressable
                        onPress={() => handleRequestPress('swap')}
                        style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                            right: 4,
                            marginTop: 15
                        }}
                    >
                        <Text>Request</Text>
                        <Icons.Heart style={{ marginLeft: 5 }} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
