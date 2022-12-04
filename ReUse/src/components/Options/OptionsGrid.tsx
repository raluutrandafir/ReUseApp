import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { OptionItem } from './OptionsItem';

interface RowProps<D> {
    onPress: (item: D) => void;
}

export interface OptionsGridProps<D> {
    data: D[];
    item: (data: D, props: RowProps<D>) => React.ReactNode;
    itemsPerRow: number;
    rowStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}

export function OptionsGrid<D>({ data, item, itemsPerRow, rowStyle, style }: OptionsGridProps<D>) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
        }
    }, [initialized]);

    function handleItemPress() {}

    const rows = data.reduce<D[][]>((acc, value) => {
        const current = acc.pop();

        if (!current) {
            acc.push([value]);
            return acc;
        }

        if (current.length < itemsPerRow) {
            current.push(value);
            acc.push(current);
        } else {
            acc.push(current);
            acc.push([value]);
        }

        return acc;
    }, []);

    return (
        <View style={style}>
            {rows.map((columns, ri) => (
                <View key={`grid-row-${ri}`} style={[styles.row, rowStyle]}>
                    {columns.map((_data, ci) => (
                        <React.Fragment key={`grid-row-${ri}-column-${ci}`}>
                            {item(_data, { onPress: handleItemPress })}
                        </React.Fragment>
                    ))}
                </View>
            ))}
        </View>
    );
}

OptionsGrid.Item = OptionItem;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 48
    }
});
