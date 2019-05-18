import { StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    textSmall: {
        fontSize: 14
    },
    viewContainer: {
        alignItems: 'center'
    },
    reactionsContainer: {
        width: (Dimensions.get('window').width * 0.85),
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 24,
        textTransform: 'uppercase',
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    bookImage: {
        width: (Dimensions.get('window').width * 0.75),
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
        marginVertical: 7
    },
    progressBar: {
        marginTop: 5,
        width: (Dimensions.get('window').width * 0.80)
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: (Dimensions.get('window').width * 0.85)
    }
});

export default {
    styles
}