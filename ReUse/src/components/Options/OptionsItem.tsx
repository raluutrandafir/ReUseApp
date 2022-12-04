import React from 'react';
import { StyleSheet, View } from 'react-native';

export function OptionItem() {
    return (
        <>
            <View style={styles.image}></View>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'red'
    }
});
