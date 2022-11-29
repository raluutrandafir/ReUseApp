import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        backgroundColor: '#F9F8F6',
        position: 'relative',
        height: '100%'
    },
    descriptionContainer: {
        height: 200,
        width: 160,
        position: 'absolute',
        right: 0,
        top: 40
    },
    title: {
        fontSize: 40,
        fontWeight: '600',
        fontStyle: 'italic',
        marginTop: 400,
        color: '#DBCAAA',
        alignSelf: 'center'
    },
    description: {
        fontSize: 32,
        color: '#ABB28D',
        fontWeight: '900'
    },
    imageStyle: {
        height: 340,
        width: 260,
        position: 'absolute',
        top: 0
    },
    signIn: {
        alignSelf: 'center',
        marginTop: 250,
        fontWeight: '600',
        fontSize: 24,
        color: '#ABB28D'
    },
    card: {
        height: 160,
        width: 170,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    cardsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        bottom: 200,
        justifyContent: 'space-evenly'
    },
    cardTitle: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
        color: '#ABB28D'
    }
});
