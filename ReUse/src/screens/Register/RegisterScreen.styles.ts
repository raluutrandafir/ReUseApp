import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    animation: {
        marginTop: 40,
        marginLeft: 2,
        height: 220
    },
    screen: {
        backgroundColor: '#DDCDAF',
        position: 'relative',
        height: '100%'
    },
    description: {
        fontSize: 32,
        color: '#ABB28D',
        fontWeight: '600',
        alignSelf: 'center',
        marginBottom: 20
    },
    input: {
        // marginBottom: 12
    },
    signIn: {
        alignSelf: 'center',
        marginTop: 12,
        fontWeight: '600',
        fontSize: 24,
        color: '#ABB28D'
    },
    content: {
        backgroundColor: '#F9F8F6',
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 24,
        position: 'absolute',
        bottom: 0
    }
});
