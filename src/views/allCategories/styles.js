import { StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    bookImage: {
        width: (Dimensions.get('window').width * 0.25),
        height: (Dimensions.get('window').width * 0.40)
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    price: {
        color: 'blue'
    },
    green: {
        color: 'green'
    },
    orange: {
        color: 'orange',
    },
    red: {
        color: 'red'
    },
    textSmall: {
        fontSize: 14
    },
    icon: {
        fontSize: 14,
        marginRight: 0
    },
    author: {
        fontStyle: 'italic'
    }
});

export default {
    styles
}