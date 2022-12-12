import React from 'react';
import { ImageSourcePropType, View } from 'react-native';

import { OptionsGrid } from '../../components/Options';
import { Images } from '../../environment/Images';

import styles from './ChooseScreen.style';

type Options = {
    id: number;
    externalId: string;
    imageSrc: ImageSourcePropType;
};

const OPTIONS: Options[] = [
    { id: 1, externalId: 'Clothes', imageSrc: Images.Clothes },
    { id: 2, externalId: 'Shoes', imageSrc: Images.Shoes },
    { id: 3, externalId: 'Accesories', imageSrc: Images.Accessories },
    { id: 4, externalId: 'Home Appliances', imageSrc: Images.HomeAppliances },
    { id: 5, externalId: 'Furniture', imageSrc: Images.Furniture },
    { id: 6, externalId: 'Home accessories', imageSrc: Images.HomeAccessories },
    { id: 7, externalId: 'Toys', imageSrc: Images.Toys },
    { id: 8, externalId: 'Garden', imageSrc: Images.Garden },
    { id: 9, externalId: 'Baby Products', imageSrc: Images.BabyProducts },
    { id: 10, externalId: 'Books', imageSrc: Images.Books },
    { id: 11, externalId: 'School', imageSrc: Images.School },
    { id: 12, externalId: 'Handmade', imageSrc: Images.Handmade },
    { id: 13, externalId: 'Auto', imageSrc: Images.Auto },
    { id: 14, externalId: 'Sports', imageSrc: Images.Sports },
    { id: 15, externalId: 'Music', imageSrc: Images.Music }
];

export function ChooseScreen() {
    return (
        <View style={styles.screen}>
            <OptionsGrid
                data={OPTIONS}
                itemsPerRow={3}
                style={styles.oprtionsGrid}
                item={(option) => {
                    return <OptionsGrid.Item data={option} />;
                }}
            />
        </View>
    );
}
