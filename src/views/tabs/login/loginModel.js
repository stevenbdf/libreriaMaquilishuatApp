import AsyncStorage from '@react-native-community/async-storage';
import fetchBlob from '../../../utils/fetchBlob/RNFetchBlob'
import { ToastAndroid } from 'react-native'

const saveDataClient = async data => {
  try {
    await AsyncStorage.setItem('dataClient', JSON.stringify(data));
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

const sendLoginData = async (email, password, context) => {
  data = [{ name: 'correo', data: String(email) }, { name: 'contrasena', data: String(password) }]
  const resp = await fetchBlob.postData('clientesApp.php?site=public&action=login', data);
  if (resp.status) {
    await saveDataClient(resp.data);
    context.setState({
      email: '',
      password: '',
      render: true
    })
    context.props.navigation.navigate('Main');
    ToastAndroid.show('¡Bienvenido!', ToastAndroid.LONG);
  } else {
    alert(resp.exception)
  }
}

export default {
  sendLoginData
}