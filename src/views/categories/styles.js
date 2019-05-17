import { StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flex: 1,
        height: (Dimensions.get('window').width / 2),
        position: 'relative',
        margin: 7,
        borderRadius: 7,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 7,
    },
    itemTextContainer: {
        flex: 1,
        position: 'relative'
    },
    itemCard: {
        borderRadius: 10
    },
    itemText: {
        flex: 1,
        color: '#fff',
        backgroundColor: 'rgba(33, 37, 41, 0.80)',
        position: 'absolute',
        width: '85%',
        marginLeft: '7.5%',
        marginTop: (Dimensions.get('window').width * 0.19),
        textAlign: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: 7,
        overflow: 'hidden',
    },
    cardImage: {
        height: 200,
        width: 200,
        flex: 1 
    }
});

export default {
    styles
}
