import fetchBlob from '../../../utils/fetchBlob/RNFetchBlob'

const sendLoginData = async (email, password, context) => {
    data = [{ name: 'correo', data: String(email) }, { name: 'contrasena', data: String(password) }]
    const resp = await fetchBlob.postData('clientes.php?site=public&action=login', data);
    if (resp.status) {
        context.props.navigation.navigate('Categories');
    } else {
        alert(resp.exception)
    }
}

const logout = async () => {
    const res = await axios.get(`clientes.php?site=public&action=logoutApp`)
    if (res.data.status) {
        alert('Has cerrado sesion')
    } else {
        alert('Error al cerrar sesion')
    }
}

export default {
    sendLoginData,
    logout
}