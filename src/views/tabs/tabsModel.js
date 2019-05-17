import axios from '../../utils/axios/axios'

const checkSession = async (context) => {
    const res = await axios.get(`clientes.php?site=public&action=checkSession`)
    if (res.data.status) {
        context.props.navigation.navigate('Categories');
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