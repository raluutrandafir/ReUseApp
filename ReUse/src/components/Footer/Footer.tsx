/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icons } from '../../environment/Icons';

interface Props {
    onRequestPress: () => void;
    onMessagesPress: () => void;
    onPlusPress: () => void;
}

export function Footer({ onRequestPress, onMessagesPress, onPlusPress }: Props) {
    return (
        <View
            style={{
                height: 70,
                borderTopWidth: 2,
                width: '100%',
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'white'
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 48, marginTop: 8 }} onPress={onRequestPress}>
                        My Requests
                    </Text>
                    <Icons.Heart style={{ marginLeft: 10, marginTop: 4 }} />
                </Pressable>
                <Pressable onPress={onPlusPress}>
                    <Icons.Plus style={{ marginHorizontal: 12 }} />
                </Pressable>
                <Pressable style={{ flexDirection: 'row' }} onPress={onMessagesPress}>
                    <Icons.Message style={{ marginRight: 10, marginTop: 4 }} />
                    <Text style={{ marginTop: 8 }}>My Messages</Text>
                </Pressable>
            </View>
        </View>
    );
}
