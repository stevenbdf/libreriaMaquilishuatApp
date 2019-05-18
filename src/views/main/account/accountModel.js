import axios from '../../../utils/axios/axios'

const logout = async (context) => {
    const res = await axios.get(`clientes.php?site=public&action=logoutApp`)
    if (res.data.status) {
        alert('Has cerrado sesion')
        context.props.navigation.navigate('Home');
    } else {
        alert('Error al cerrar sesion')
    }
}

export default {
    logout
}