import React, { Component } from 'react';
import { Body, Spinner, List, ListItem, Text, Left, Right, Button, Icon } from 'native-base';
import { ScrollView, Image } from 'react-native';
import Header from '../../components/Header/header'
import stylesContainer from './styles'
import model from './allCategoriesModel'

export default class AllCategories extends Component {
    state = {
        products: undefined
    }

    async componentDidMount() {
        model.loadProducts(this.props.navigation.getParam('idCat', '2'), this )
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
                {
                    this.state.products
                        ?
                        this.state.products.map(item =>
                            <List key={item.idLibro}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Image style={stylesContainer.styles.bookImage} source={{ uri: `http://192.168.1.7/libreria-maquilishuat/resources/img/books/${item.img}` }} />
                                    </Left>
                                    <Body>
                                        <Text style={stylesContainer.styles.title}>{item.NombreL}</Text>
                                        <Text style={stylesContainer.styles.price}>${item.precioFinal} </Text>

                                        <Text style={stylesContainer.styles.textSmall}>Aprobación: {model.printAprobacion(item.aprobacion, stylesContainer)}</Text>
                                        <Text style={[stylesContainer.styles.author, stylesContainer.styles.textSmall]}>{item.nombreAutor} {item.apellidoAutor}</Text>
                                        <Text note numberOfLines={3}>{model.limitText(item.resena)}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent>
                                            <Text>Ver</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            </List>
                        )
                        :
                        <Spinner color='blue' />
                }
            </ScrollView>
        );
    }
}