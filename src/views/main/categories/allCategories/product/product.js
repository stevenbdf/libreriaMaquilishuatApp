import React, { Component } from 'react'
import { View, ScrollView, Image, ProgressBarAndroid } from 'react-native'
import { Button, Icon, Text, Left, Right } from 'native-base'
import HeaderComponent from '../../../../../components/Header/header'
import stylesContainer from './styles'
import model from './productModel'

export default class Product extends Component {
    state = {
        product: undefined
    }

    async componentDidMount() {
        await model.loadProduct(this.props.navigation.getParam('idProducto', '1'), this)
        console.log(this.state.product)
    }

    render() {

        return (
            <ScrollView>
                <HeaderComponent title={'Libreria Maquilishuat'}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon type="FontAwesome" name='arrow-left' style={stylesContainer.styles.icon} />
                        <Text style={stylesContainer.styles.textSmall}>Volver</Text>
                    </Button>
                </HeaderComponent>
                {
                    this.state.product &&
                    <View style={stylesContainer.styles.viewContainer}>
                        <Text style={stylesContainer.styles.title}>
                            {this.state.product.NombreL}
                        </Text>
                        <Image style={stylesContainer.styles.bookImage} source={{ uri: `http://192.168.1.7/libreria-maquilishuat/resources/img/books/${this.state.product.img}` }} />
                        <View style={stylesContainer.styles.reactionsContainer}>
                            <Icon onPress={() => model.handleLikeClick(this)} type="FontAwesome" name='thumbs-up' style={stylesContainer.styles.reactionIcon} />
                            <Text style={stylesContainer.styles.reactionText}>{this.state.product.likes}</Text>
                            <Text style={stylesContainer.styles.reactionText}>Likes</Text>
                            <Icon onPress={() => model.handleDislikeClick(this)} type="FontAwesome" name='thumbs-down' style={stylesContainer.styles.reactionIcon} />
                            <Text style={stylesContainer.styles.reactionText}>{this.state.product.dislikes}</Text>
                            <Text style={stylesContainer.styles.reactionText}>Dislikes</Text>
                        </View>
                        <ProgressBarAndroid style={stylesContainer.styles.progressBar} styleAttr="Horizontal" color="#2196F3" indeterminate={false} progress={(this.state.product.aprobacion / 100)} />
                        <View style={stylesContainer.styles.flexRow}>
                            <Text style={stylesContainer.styles.reactionText}>Precio $:</Text>
                            <Text style={stylesContainer.styles.reactionText}>{this.state.product.precioFinal}</Text>
                            <Text style={stylesContainer.styles.reactionText}>Disponibles:</Text>
                            <Text style={stylesContainer.styles.reactionText}>{this.state.product.cantidad}</Text>
                        </View>
                    </View>
                }
            </ScrollView>
        )
    }
}