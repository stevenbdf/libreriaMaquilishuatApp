import { StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    textSmall: {
        fontSize: 14
    },
    viewContainer: {
        alignItems: 'center',
        paddingBottom: 75
    },
    green: {
        color: '#2dce89'
    },
    reactionsContainer: {
        width: (Dimensions.get('window').width * 0.90),
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 30,
        textTransform: 'uppercase',
        marginVertical: 15,
        fontFamily: 'Staatliches'
    },
    bookImage: {
        width: (Dimensions.get('window').width * 0.80),
        height: (Dimensions.get('window').width),
    },
    icon: {
        fontSize: 14,
        marginRight: 0
    },
    reactionIcon: {
        fontSize: 35,
    },
    reactionText: {
        marginVertical: 7,
        fontFamily: 'Staatliches',
        fontSize: 20
    },
    progressBar: {
        marginTop: 5,
        width: (Dimensions.get('window').width * 0.85)
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: (Dimensions.get('window').width * 0.90),
        marginTop: 15
    },
    flexColumn: {
        flexDirection: 'column',
        width: (Dimensions.get('window').width * 0.90),
        marginTop: 15
    },
    quantityInput: {
        width: (Dimensions.get('window').width * 0.45),
        marginVertical: 0
    },
    cartBtn: {
        marginTop: 7,
    },
    col6 : {
        width: (Dimensions.get('window').width * 0.45)
    }
});

export default {
    styles
}