import fetchBlob from '../../../../../utils/fetchBlob/RNFetchBlob'

const loadProduct = async (idProducto, context) => {
    console.log(idProducto)
    data = [{ name: 'idProducto', data: String(idProducto) }]
    const resp = await fetchBlob.postData('productos.php?site=public&action=get', data);
    console.log(resp)
    if (resp.status) {
        context.setState({
            product: resp.data
        })
    } else {
        alert('Error al cargar información del producto')
    }
}

const loadReactions = async (idProducto, context) => {
    data = [{ name: 'idProducto', data: String(idProducto) }]
    const resp = await fetchBlob.postData('reacciones.php?site=public&action=readReaccionesCliente', data);
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

const handleLikeClick = async (context) => {
    const like = context.state.like
    const dislike = context.state.dislike
    const product = context.state.product
    if (!like && !dislike) {
        data = [{ name: 'idProducto', data: String(product.idLibro) }, { name: 'tipoReaccion', data: '1' }]
        const resp = await fetchBlob.postData('reacciones.php?site=public&action=insert', data);
        if (resp.status) {
            await loadReactions(product.idLibro, context)
            await loadProduct(product.idLibro, context)
        } else {
            alert('Error al dar like')
        }
    } else if (!like && dislike) {
        updateReaction('1', product.idLibro, context)
    } else if (like && !dislike) {
        deleteReaction(product.idLibro, context)
    }
}

const handleDislikeClick = async (context) => {
    const like = context.state.like
    const dislike = context.state.dislike
    const product = context.state.product
    if (!like && !dislike) {
        data = [{ name: 'idProducto', data: String(product.idLibro) }, { name: 'tipoReaccion', data: '0' }]
        const resp = await fetchBlob.postData('reacciones.php?site=public&action=insert', data);
        if (resp.status) {
            await loadReactions(product.idLibro, context)
            await loadProduct(product.idLibro, context)
        } else {
            alert('Error al dar like')
        }
    } else if (like && !dislike) {
        updateReaction('0', product.idLibro, context)
    } else if (!like && dislike) {
        deleteReaction(product.idLibro, context)
    }
}


const updateReaction = async (nuevaReaccion, idProducto, context) => {
    data = [{ name: 'idProducto', data: String(idProducto) }, { name: 'nuevaReaccion', data: nuevaReaccion }]
    const resp = await fetchBlob.postData('reacciones.php?site=public&action=updateReaccion', data);
    if (resp.status) {
        await loadReactions(idProducto, context)
        await loadProduct(idProducto, context)
    } else {
        alert('Error al modificar reaccion')
    }
}

const deleteReaction = async (idProducto, context) => {
    data = [{ name: 'idProducto', data: String(idProducto) }]
    const resp = await fetchBlob.postData('reacciones.php?site=public&action=delete', data);
    if (resp.status) {
        loadReactions(idProducto, context)
        loadProduct(idProducto, context)
    } else {
        alert('Error al borrar like')
    }
}

export default {
    loadProduct,
    loadReactions,
    handleLikeClick,
    handleDislikeClick
}