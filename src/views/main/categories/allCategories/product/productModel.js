import fetchBlob from '../../../../../utils/fetchBlob/RNFetchBlob'

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

const handleLikeClick = async (context) => {
    alert('Has dado like a : '+ context.state.product.NombreL)
}

const handleDislikeClick = async (context) => {
    alert('Has dado dislike a : '+ context.state.product.NombreL)
}

export default {
    loadProduct,
    handleLikeClick,
    handleDislikeClick
}