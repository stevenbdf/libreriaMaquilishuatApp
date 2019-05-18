import React from 'react';
import { Text } from 'native-base';
import fetchBlob from '../../../../utils/fetchBlob/RNFetchBlob'

const loadProducts = async (idCategoria, context) => {
    data = [{ name: 'idCategoria', data: String(idCategoria) }]
    const resp = await fetchBlob.postData('productos.php?site=public&action=readProductosByCategory', data);
    if (resp.status) {
        context.setState({
            products: resp.data
        })
    } else {
        alert('Error al cargar productos')
    }
}

const limitText = (descripcion) => {
    var descripcionCorta = '';
    const limiteCaracteres = 120;
    for (let index = 0; index < limiteCaracteres; index++) {
        if (descripcion[index] !== undefined) {
            index !== limiteCaracteres - 1
                ? descripcionCorta = descripcionCorta + descripcion[index]
                : descripcionCorta = descripcionCorta + '...';
        } else {
            break;
        }
    }
    return descripcionCorta;
}

const printAprobacion = (aprob, stylesContainer) => {
    const colorT = aprob >= 70 ?
        <Text style={[stylesContainer.styles.green, stylesContainer.styles.textSmall]}>{aprob}% </Text>
        : aprob >= 50 && aprob <= 69 ?
            <Text style={[stylesContainer.styles.orange, stylesContainer.styles.textSmall]}>{aprob}% </Text>
            :
            <Text style={[stylesContainer.styles.red, stylesContainer.styles.textSmall]}>{aprob}% </Text>

    return (colorT)
}

export default {
    loadProducts,
    limitText,
    printAprobacion
}