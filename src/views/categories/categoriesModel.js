import axios from '../../utils/axios/axios'

const logout = async () => {
    const res = await axios.get(`clientes.php?site=public&action=logoutApp`)
    if (res.data.status) {
        alert('Has cerrado sesion')
    } else {
        alert('Error al cerrar sesion')
    }
}

const loadCategories = async (context) => {
    const res = await axios.get(`categorias.php?site=public&action=readCategoria`)
    if (res.data) {
        const respuesta = res.data.dataset;
        context.setState({
            categories: respuesta
        })
    }
}

export default {
    loadCategories,
    logout
}