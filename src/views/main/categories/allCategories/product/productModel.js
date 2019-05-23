import fetchBlob from '../../../../../utils/fetchBlob/RNFetchBlob'
import AsyncStorage from '@react-native-community/async-storage'
import { ToastAndroid } from 'react-native'
import React from 'react'
import { Card, CardItem, Body, Text, View, Icon, Textarea } from 'native-base'
import stylesContainer from './styles'

const styles = stylesContainer.styles;

const loadProduct = async (idProducto, context) => {
    data = [{ name: 'idProducto', data: String(idProducto) }]
    const resp = await fetchBlob.postData('productos.php?site=public&action=get', data);
    if (resp.status) {
        context.setState({
            product: resp.data
        })
    } else {
        alert('Error al cargar información del producto')
    }
}

const getDataClient = async (context) => {
    let dataClient = undefined;
    try {
        dataClient = await AsyncStorage.getItem('dataClient');
        context.setState({
            dataClient: JSON.parse(dataClient)
        })
        console.log(context.state.dataClient)
    } catch (error) {
        console.log(error.message);
    }
}

const loadReactions = async (idProducto, context) => {
    const idCliente = context.state.dataClient.idCliente
    data = [{ name: 'idProducto', data: String(idProducto) }, { name: 'idCliente', data: idCliente }]
    const resp = await fetchBlob.postData('reaccionesApp.php?site=public&action=readReaccionesCliente', data);
    if (resp.status) {
        if (resp.data[0].tipo === '1') {
            context.setState({
                like: true,
                dislike: false
            })
        } else if (resp.data[0].tipo === '0') {
            context.setState({
                like: false,
                dislike: true
            })
        }
    } else {
        context.setState({
            like: false,
            dislike: false
        })
    }
}

const loadComments = async (idProducto, context) => {
    data = [{ name: 'idProducto', data: String(idProducto) }]
    const resp = await fetchBlob.postData('comentarioLibroApp.php?site=public&action=readComentariosLibro', data);
    if (resp.status) {
        context.setState({
            commentsRaw: resp.data
        })
        resp.data = await resp.data.map(item => {
            return (
                <Card key={item.idComent}>
                    <CardItem >
                        <Body>
                            <Text style={[styles.commentText, styles.green]}>{item.comentario}</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Body style={styles.flexRowComment}>
                            <Text style={[styles.reactionText, styles.textSmall]}>{item.nombreCliente}</Text>
                            <Text style={[styles.reactionText, styles.textSmall]}>{item.fecha}</Text>
                            {
                                parseInt(context.state.dataClient.idCliente) === parseInt(item.idClient)
                                &&
                                <View style={styles.flexRowCommentButtons}>
                                    <Icon onPress={() => handleEditComment(item.idComent, context)} style={styles.commentIcon} type="FontAwesome" name='pencil' />
                                    <Icon onPress={() => handleDeleteComment(item.idComent)} style={styles.commentIcon} type="FontAwesome" name='trash' />
                                </View>
                            }
                        </Body>
                    </CardItem>
                </Card>)
        })
        context.setState({
            comments: resp.data
        })
    }
}

const handleEditComment = async (idComentario, context) => {
    const idCliente = context.state.dataClient.idCliente
    let comentario = context.state.commentsRaw.filter( item => parseInt(item.idComent) == parseInt(idComentario))
    comentario = comentario[0].comentario
    context.props.navigation.navigate('EditComment', {idComentario, comentario, idCliente, context})
}

const handleDeleteComment = async (idComment) => {
    ToastAndroid.show(`Has eliminado el comentario ${idComment}`, ToastAndroid.SHORT)
}

const handleLikeClick = async (context) => {
    const like = context.state.like
    const dislike = context.state.dislike
    const product = context.state.product
    const idCliente = context.state.dataClient.idCliente
    if (!like && !dislike) {
        data = [{ name: 'idProducto', data: String(product.idLibro) }, { name: 'tipoReaccion', data: '1' }, { name: 'idCliente', data: String(idCliente) }]
        const resp = await fetchBlob.postData('reaccionesApp.php?site=public&action=insert', data);
        if (resp.status) {
            await loadReactions(product.idLibro, context)
            await loadProduct(product.idLibro, context)
            ToastAndroid.show('¡Te ha gustado este libro! :D', ToastAndroid.SHORT);
        } else {
            alert('Error al dar like')
        }
    } else if (!like && dislike) {
        updateReaction('1', product.idLibro, context, idCliente)
        ToastAndroid.show('¡Te ha gustado este libro! :D', ToastAndroid.SHORT);
    } else if (like && !dislike) {
        deleteReaction(product.idLibro, context, idCliente)
    }
}

const handleDislikeClick = async (context) => {
    const like = context.state.like
    const dislike = context.state.dislike
    const product = context.state.product
    const idCliente = context.state.dataClient.idCliente
    if (!like && !dislike) {
        data = [{ name: 'idProducto', data: String(product.idLibro) }, { name: 'tipoReaccion', data: '0' }, { name: 'idCliente', data: String(idCliente) }]
        const resp = await fetchBlob.postData('reaccionesApp.php?site=public&action=insert', data);
        if (resp.status) {
            await loadReactions(product.idLibro, context)
            await loadProduct(product.idLibro, context)
            ToastAndroid.show('¡No te ha gustado este libro! :(', ToastAndroid.SHORT);
        } else {
            alert('Error al dar like')
        }
    } else if (like && !dislike) {
        updateReaction('0', product.idLibro, context, idCliente)
        ToastAndroid.show('¡No te ha gustado este libro! :(', ToastAndroid.SHORT);
    } else if (!like && dislike) {
        deleteReaction(product.idLibro, context, idCliente)
    }
}

const updateReaction = async (nuevaReaccion, idProducto, context, idCliente) => {
    data = [{ name: 'idProducto', data: String(idProducto) }, { name: 'nuevaReaccion', data: nuevaReaccion }, { name: 'idCliente', data: String(idCliente) }]
    const resp = await fetchBlob.postData('reaccionesApp.php?site=public&action=updateReaccion', data);
    if (resp.status) {
        await loadReactions(idProducto, context)
        await loadProduct(idProducto, context)
    } else {
        alert('Error al modificar reaccion')
    }
}

const deleteReaction = async (idProducto, context, idCliente) => {
    data = [{ name: 'idProducto', data: String(idProducto) }, { name: 'idCliente', data: String(idCliente) }]
    const resp = await fetchBlob.postData('reaccionesApp.php?site=public&action=delete', data);
    if (resp.status) {
        loadReactions(idProducto, context)
        loadProduct(idProducto, context)
    } else {
        alert('Error al borrar like')
    }
}

const addComment = async (context) => {
    const MyComment = context.state.MyComment
    const idProduct = context.state.product.idLibro
    const idCliente = context.state.dataClient.idCliente
    if (MyComment && idProduct) {
        data = [{ name: 'idProducto', data: String(idProduct) },
        { name: 'comentario', data: String(MyComment) },
        { name: 'idCliente', data: String(idCliente) }]
        const resp = await fetchBlob.postData('comentarioLibroApp.php?site=public&action=createComentario', data);
        console.log(resp)
        if (resp.status) {
            await loadReactions(idProduct, context)
            await loadProduct(idProduct, context)
            await loadComments(idProduct, context)
            ToastAndroid.show('¡Comentario agregado!', ToastAndroid.SHORT);
        } else {
            alert('Error al crear comentario')
        }
    } else {
        alert('Escribe algo en la caja de comentarios')
    }
}

export default {
    loadProduct,
    loadReactions,
    loadComments,
    getDataClient,
    handleLikeClick,
    handleDislikeClick,
    addComment
}