import React, { Component } from 'react'
import { View, ScrollView, Image, ProgressBarAndroid } from 'react-native'
import { Button, Icon, Spinner, Text, Item, Input, Label, Textarea } from 'native-base'
import HeaderComponent from '../../../../../components/Header/header'
import stylesContainer from './styles'
import model from './productModel'

const styles = stylesContainer.styles;

export default class Product extends Component {
    state = {
        product: undefined,
        commentsRaw: undefined,
        comments: undefined,
        like: false,
        dislike: false,
        dataClient: undefined,
        MyComment: undefined,
        quantity: '1'
    }


    async componentDidMount() {
        const idProducto = this.props.navigation.getParam('idProducto', '1')
        await model.getDataClient(this)
        await model.loadReactions(idProducto, this)
        await model.loadComments(idProducto, this)
        await model.loadProduct(idProducto, this)
    }

    render() {
        return (
            <View>
                <HeaderComponent title={'Libreria Maquilishuat'}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon type="FontAwesome" name='arrow-left' style={styles.icon} />
                        <Text style={styles.textSmall}>Volver</Text>
                    </Button>
                </HeaderComponent>
                {
                    this.state.product && this.state.comments ?
                        <ScrollView contentContainerStyle={styles.viewContainer}>
                            <Text style={[styles.title, styles.green]}>
                                {this.state.product.NombreL}
                            </Text>
                            <Image style={styles.bookImage} source={{ uri: `http://35.229.86.167/resources/img/books/${this.state.product.img}` }} />
                            <View style={styles.reactionsContainer}>
                                <Icon onPress={() => model.handleLikeClick(this)} type="FontAwesome" name='thumbs-up' style={[styles.reactionIcon, this.state.like && styles.green]} />
                                <Text style={styles.reactionText}>{this.state.product.likes}</Text>
                                <Text style={styles.reactionText}>Likes</Text>
                                <Icon onPress={() => model.handleDislikeClick(this)} type="FontAwesome" name='thumbs-down' style={[styles.reactionIcon, this.state.dislike && styles.green]} />
                                <Text style={styles.reactionText}>{this.state.product.dislikes}</Text>
                                <Text style={styles.reactionText}>Dislikes</Text>
                            </View>
                            <ProgressBarAndroid style={styles.progressBar} styleAttr="Horizontal" color="#2196F3" indeterminate={false} progress={(this.state.product.aprobacion / 100)} />
                            <View style={styles.flexRow}>
                                <Text style={[styles.reactionText, styles.green]}>Precio $:</Text>
                                <Text style={styles.reactionText}>{this.state.product.precioFinal}</Text>
                                <Text style={[styles.reactionText, styles.green]}>Disponibles:</Text>
                                <Text style={styles.reactionText}>{this.state.product.cantidad}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Item style={styles.quantityInput}>
                                    <Label>Cantidad:</Label>
                                    <Input keyboardType="numeric" style={styles.quantityInput} onChangeText={(text) => this.setState({ quantity: text })} value={this.state.quantity} />
                                </Item>
                                <Button success style={styles.cartBtn}>
                                    <Text>Agregar</Text>
                                    <Icon type="FontAwesome" name='cart-plus' />
                                </Button>
                            </View>
                            <View style={styles.flexColumn}>
                                <Text style={[styles.title, styles.green]}>
                                    Acerca del libro
                                </Text>
                                <Text>
                                    {this.state.product.resena}
                                </Text>
                            </View>
                            <View style={styles.flexRow}>
                                <View style={styles.col6}>
                                    <Text style={[styles.reactionText, styles.green]}>No. de paginas:</Text>
                                    <Text style={styles.reactionText}>{this.state.product.NoPag}</Text>
                                </View>
                                <View style={styles.col6}>
                                    <Text style={[styles.reactionText, styles.green]}>Editorial:</Text>
                                    <Text style={styles.reactionText}>{this.state.product.editorial}</Text>
                                </View>
                            </View>
                            <View style={styles.flexRow}>
                                <View style={styles.col6}>
                                    <Text style={[styles.reactionText, styles.green]}>Idioma:</Text>
                                    <Text style={styles.reactionText}>{this.state.product.Idioma}</Text>
                                </View>
                                <View style={styles.col6}>
                                    <Text style={[styles.reactionText, styles.green]}>Autor:</Text>
                                    <Text style={styles.reactionText}>{this.state.product.nombreAutor} {this.state.product.apellidoAutor} </Text>
                                </View>
                            </View>
                            <View style={styles.flexRow}>
                                <View style={styles.col6}>
                                    <Text style={[styles.reactionText, styles.green]}>Encuadernacion:</Text>
                                    <Text style={styles.reactionText}>{this.state.product.encuadernacion}</Text>
                                </View>
                                <View style={styles.col6}>
                                    <Text style={[styles.reactionText, styles.green]}>País de Origen:</Text>
                                    <Text style={styles.reactionText}>{this.state.product.pais}</Text>
                                </View>
                            </View>
                            <View style={styles.flexColumn}>
                                <Text style={[styles.title, styles.green]}>
                                    Comentarios
                                </Text>
                                <Text style={styles.textSmall}>Logeado como: {this.state.dataClient.correo}</Text>
                            </View>
                            <View style={styles.flexColumn}>
                                <Textarea rowSpan={4} bordered placeholder="Escribe un comentario..."
                                          onChangeText={(text) => this.setState({ MyComment: text })}
                                          value={this.state.MyComment}
                                />
                                <View style={styles.sendCommentButton}>
                                    <Button success onPress={() => model.addComment(this)}>
                                        <Text>Enviar</Text>
                                        <Icon type="FontAwesome" name='send' />
                                    </Button>
                                </View>
                                {
                                    this.state.comments.map(item => item)
                                }
                            </View>

                        </ScrollView>
                        :
                        <Spinner color='blue' />
                }
            </View>
        )
    }
}