import React from 'react';
import { ImageBackground, StyleSheet, View, ImageSourcePropType, Text } from 'react-native';

type Options = {
    id: number;
    externalId: string;
    imageSrc: ImageSourcePropType;
};

export interface OptionItemProps<D> {
    data: Options;
}

export function OptionItem<D>({ data }: OptionItemProps<D>) {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={data.imageSrc} />
            <Text style={styles.text}>{data.externalId}</Text>
        </View>
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
