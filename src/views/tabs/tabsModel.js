import AsyncStorage from '@react-native-community/async-storage'

const getDataClient = async () => {
    let dataClient = undefined;
    try {
      dataClient = await AsyncStorage.getItem('dataClient');
    } catch (error) {
      console.log(error.message);
    }
    return dataClient
  }

const checkSession = async (context) => {
    if (await getDataClient() != undefined) {
        context.props.navigation.navigate('Main');
    } else {
        console.log('NO estas logeado')
        context.setState({
            render: true
        })
    }
}

export default {
    checkSession
}