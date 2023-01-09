import React from 'react';
import { ImageBackground, StyleSheet, ImageSourcePropType, Text, Pressable } from 'react-native';

type Options = {
    id: string;
    externalId: string;
    imageSrc: ImageSourcePropType;
};

export interface OptionItemProps<D> {
    data: Options;
    onPress: () => void;
}

export function OptionItem<D>({ data, onPress }: OptionItemProps<D>) {
    function handlePress() {
        onPress();
    }

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <ImageBackground style={styles.image} source={data.imageSrc} />
            <Text style={styles.text}>{data.externalId}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        maxWidth: 100
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    text: {
        color: '#ABB28D',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
        textAlign: 'center'
    }
});
