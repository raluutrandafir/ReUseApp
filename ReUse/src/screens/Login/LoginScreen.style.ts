import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        backgroundColor: '#F9F8F6',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 24
    },
    tile: {
        fontSize: 32,
        fontWeight: '600',
        fontStyle: 'italic',
        color: '#DBCAAA',
        marginTop: 24,
        marginBottom: 48
    },
    loginButton: {
        backgroundColor: '#DBCAAA',
        width: 148,
        borderRadius: 20,
        height: 40,
        alignItems: 'center',
        marginBottom: 80
    },
    button: {
        fontSize: 18,
        paddingTop: 10
    },
    animation: {
        marginTop: 2,
        marginLeft: 2,
        height: 48,
        width: 48
    },
    imageStyle: {
        height: '100%'
    },
    input: {
        marginBottom: 24
    },
    content: {
        position: 'absolute',
        backgroundColor: '#F9F8F6',
        bottom: 48,
        width: '100%',
        alignItems: 'center',
        borderRadius: 20,
        height: 400,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 1.0,
        paddingHorizontal: 24
    },
    signUp: {
        alignItems: 'flex-end'
    }
});
