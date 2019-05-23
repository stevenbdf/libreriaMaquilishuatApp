import fetchBlob from '../../../../../../utils/fetchBlob/RNFetchBlob'
import { ToastAndroid } from 'react-native'

const updateComment = async (context, contextProduct) => {
    const newComment = context.state.newComment
    const idComment = context.state.idComment
    const idClient = context.state.idClient
    if (newComment && idComment) {
        data = [{ name: 'idComentario', data: String(idComment) },
        { name: 'comentario', data: String(newComment) },
        { name: 'idCliente', data: String(idClient) }]
        const resp = await fetchBlob.postData('comentarioLibroApp.php?site=public&action=updateComentario', data);
        if (resp.status) {
            ToastAndroid.show('¡Comentario modificado!', ToastAndroid.SHORT);
            context.props.navigation.navigate('Product')
            contextProduct.componentDidMount()
        } else {
            alert('Error al modificar comentario')
        }
    } else {
        alert('Escribe algo en la caja de comentarios')
    }
}

export default {
    updateComment
}
