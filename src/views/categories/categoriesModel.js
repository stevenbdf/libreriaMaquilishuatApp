import axios from '../../utils/axios/axios'

const saludar = () => {console.log('Hola steven')}

const logout = async () => {
    const res = await axios.get(`clientes.php?site=public&action=logoutApp`)
    if (res.data.status) {
        alert('Has cerrado sesion')
    } else {
        alert('Error al cerrar sesion')
    }
}

export default {
    saludar,
    logout
}