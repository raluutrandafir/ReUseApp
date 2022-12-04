import React from 'react';
import { View } from 'react-native';

import { OptionsGrid } from '../../components/Options';

import styles from './ChooseScreen.style';

type Options = {
    id: number;
    externalId: string;
};

const OPTIONS: Options[] = [
    { id: 1, externalId: 'Clothes' },
    { id: 2, externalId: 'Shoes' },
    { id: 3, externalId: 'Accesories' },
    { id: 4, externalId: 'Home Appliances' },
    { id: 5, externalId: 'Furniture' },
    { id: 6, externalId: 'Home accessories' },
    { id: 7, externalId: 'Toys' },
    { id: 8, externalId: 'Garden' },
    { id: 9, externalId: 'Baby Products' },
    { id: 10, externalId: 'Books' },
    { id: 11, externalId: 'School' },
    { id: 12, externalId: 'Handmade' },
    { id: 13, externalId: 'Auto' },
    { id: 14, externalId: 'Sports' },
    { id: 15, externalId: 'Music' }
];

export function ChooseScreen() {
    return (
        <View style={styles.screen}>
            <OptionsGrid
                data={OPTIONS}
                itemsPerRow={3}
                style={styles.oprtionsGrid}
                item={() => {
                    return <OptionsGrid.Item />;
                }}
            />
        </View>
    );
}
