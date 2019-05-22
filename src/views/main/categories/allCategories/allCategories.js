import React, { Component } from 'react';
import { Body, Spinner, List, ListItem, Text, Left, Right, Button, Icon } from 'native-base';
import { ScrollView, Image, BackHandler } from 'react-native';
import Header from '../../../../components/Header/header'
import stylesContainer from './styles'
import model from './allCategoriesModel'

export default class AllCategories extends Component {
    state = {
        products: undefined
    }

    async componentDidMount() {
        model.loadProducts(this.props.navigation.getParam('idCat', '2'), this)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.goBack()
        return false;
    }

    render() {
        return (
            <ScrollView>
                <Header title={this.props.navigation.getParam('title', 'No se ha enviado titulo')}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon type="FontAwesome" name='arrow-left' style={stylesContainer.styles.icon} />
                        <Text style={stylesContainer.styles.textSmall}>Volver</Text>
                    </Button>
                </Header>
                <List>
                    {
                        this.state.products
                            ?
                            this.state.products.map(item =>
                                <ListItem thumbnail key={item.idLibro}>
                                    <Left>
                                        <Image style={stylesContainer.styles.bookImage} source={{ uri: `http://35.229.86.167/resources/img/books/${item.img}` }} />
                                    </Left>
                                    <Body>
                                        <Text style={stylesContainer.styles.title}>{item.NombreL}</Text>
                                        <Text style={stylesContainer.styles.price}>${item.precioFinal} </Text>

                                        <Text style={stylesContainer.styles.textSmall}>Aprobación: {model.printAprobacion(item.aprobacion, stylesContainer)}</Text>
                                        <Text style={[stylesContainer.styles.author, stylesContainer.styles.textSmall]}>{item.nombreAutor} {item.apellidoAutor}</Text>
                                        <Text note numberOfLines={3}>{model.limitText(item.resena)}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => this.props.navigation.navigate('Product', { idProducto: item.idLibro })}>
                                            <Text>Ver</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                            :
                            <Spinner color='blue' />
                    }
                </List>
            </ScrollView>
        );
    }
}