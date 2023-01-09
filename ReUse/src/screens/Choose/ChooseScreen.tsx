import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';

import { OptionsGrid } from '../../components/Options';
import { Images } from '../../environment/Images';

import styles from './ChooseScreen.style';
import { Routes, RootStackParams } from '../../app/navigation';

type Options = {
    id: string;
    externalId: string;
    imageSrc: ImageSourcePropType;
};

export type ChooseScreenRouteType = RouteProp<RootStackParams, Routes.ChooseScreen>;

const OPTIONS: Options[] = [
    { id: 'Clothes', externalId: 'Clothes', imageSrc: Images.Clothes },
    { id: 'Shoes', externalId: 'Shoes', imageSrc: Images.Shoes },
    { id: 'Accesories', externalId: 'Accesories', imageSrc: Images.Accessories },
    { id: 'HomeAppliances', externalId: 'Home Appliances', imageSrc: Images.HomeAppliances },
    { id: 'Furniture', externalId: 'Furniture', imageSrc: Images.Furniture },
    { id: 'HomeAccessories', externalId: 'Home accessories', imageSrc: Images.HomeAccessories },
    { id: 'Toys', externalId: 'Toys', imageSrc: Images.Toys },
    { id: 'Garden', externalId: 'Garden', imageSrc: Images.Garden },
    { id: 'BabyProducts', externalId: 'Baby Products', imageSrc: Images.BabyProducts },
    { id: 'Books', externalId: 'Books', imageSrc: Images.Books },
    { id: 'School', externalId: 'School', imageSrc: Images.School },
    { id: 'Handmade', externalId: 'Handmade', imageSrc: Images.Handmade },
    { id: 'Auto', externalId: 'Auto', imageSrc: Images.Auto },
    { id: 'Sports', externalId: 'Sports', imageSrc: Images.Sports },
    { id: 'Music', externalId: 'Music', imageSrc: Images.Music }
];

export function ChooseScreen() {
    const navigation = useNavigation();

    const route = useRoute<ChooseScreenRouteType>();

    function handlePress(optionId: string) {
        navigation.navigate(Routes.ProductScreen, { type: route.params.type, optionId: optionId });
    }

    return (
        <View style={styles.screen}>
            <OptionsGrid
                data={OPTIONS}
                itemsPerRow={3}
                style={styles.oprtionsGrid}
                item={(option) => {
                    return (
                        <OptionsGrid.Item
                            data={option}
                            onPress={() => handlePress(option.externalId)}
                        />
                    );
                }}
            />
        </View>
    );
}
