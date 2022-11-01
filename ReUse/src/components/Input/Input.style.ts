import { TextStyle, StyleSheet } from 'react-native';

import { InputState, StateStylesMap } from './Input.types';

export function getContainerStateStyles(state: InputState) {
    const containerStateStyles: StateStylesMap<InputState, TextStyle> = {
        [InputState.Default]: {
            backgroundColor: '#DDCDAF80',
            borderColor: '#DDCDAF80'
        },

        [InputState.Disabled]: {
            backgroundColor: '#92919b',
            borderColor: '#92919b'
        },
        [InputState.Focus]: {
            backgroundColor: '#DDCDAF80',
            borderColor: '#936F00'
        },
        [InputState.Error]: {
            backgroundColor: '#DDCDAF80',
            borderColor: '#EF463B'
        }
    };

    return containerStateStyles[state];
}

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        height: '100%',
        flex: 1
    },
    input: {
        borderWidth: 0,
        width: '100%'
    }
});
