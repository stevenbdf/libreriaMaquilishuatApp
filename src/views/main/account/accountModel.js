import AsyncStorage from '@react-native-community/async-storage';

const deleteDataClient = async () => {
    try {
        await AsyncStorage.removeItem('dataClient');
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};

const logout = async (context) => {
    alert('Has cerrado sesion')
    await deleteDataClient()
    context.props.navigation.navigate('Home');
}

export default {
    logout
}