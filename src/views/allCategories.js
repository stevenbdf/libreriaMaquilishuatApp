import React, { Component } from 'react';
import {
    Card, CardItem, Header, Body, Title, Spinner, List, ListItem,
    Thumbnail, Text, Left, Right, Button, Icon
} from 'native-base';
import { View, StyleSheet, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const numColumns = 2;

export default class AllCategories extends Component {
    state = {
        products: undefined
    }

    async componentDidMount() {
        RNFetchBlob.fetch('POST', 'http://192.168.1.7/libreria-maquilishuat/core/api/productos.php?site=public&action=readProductosByCategory', {
            Authorization: "Bearer access-token",
        }, [
                { name: 'idCategoria', data: this.props.navigation.getParam('idCat', 'No se ha enviado titulo') }
            ]
        )
            .then((resp) => {
                const respuestaTraducida = JSON.parse(resp.data);
                if (respuestaTraducida.status == 1) {
                    this.setState({
                        products: respuestaTraducida.dataset
                    })
                } else {
                    alert(respuestaTraducida.exception);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    limitText(descripcion) {
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

    printAprobacion(aprob) {
        const colorT = aprob >= 70 ?
            <Text style={[styles.green, styles.textSmall]}>{aprob}% </Text>
            : aprob >= 50 && aprob <= 69 ?
                <Text style={[styles.orange, styles.textSmall]}>{aprob}% </Text>
                :
                <Text style={[styles.red, styles.textSmall]}>{aprob}% </Text>

        return (colorT)
    }

    render() {
        return (
            <ScrollView>
                <Header hasTabs>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon type="FontAwesome" name='arrow-left' style={styles.icon} />
                        <Text style={styles.textSmall}>Volver</Text>
                    </Button>
                    <Body>
                        <Title> {this.props.navigation.getParam('title', 'No se ha enviado titulo')}</Title>
                    </Body>
                </Header>
                {
                    this.state.products
                        ?
                        this.state.products.map(item =>
                            <List key={item.idLibro}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Image style={styles.bookImage} source={{ uri: `http://192.168.1.7/libreria-maquilishuat/resources/img/books/${item.img}` }} />
                                    </Left>
                                    <Body>
                                        <Text style={styles.title}>{item.NombreL}</Text>
                                        <Text style={styles.price}>${item.precioFinal} </Text>

                                        <Text style={styles.textSmall}>Aprobación: {this.printAprobacion(item.aprobacion)}</Text>
                                        <Text style={[styles.author, styles.textSmall]}>{item.nombreAutor} {item.apellidoAutor}</Text>
                                        <Text note numberOfLines={3}>{this.limitText(item.resena)}</Text>
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

const styles = StyleSheet.create({
    bookImage: {
        width: (Dimensions.get('window').width * 0.25),
        height: (Dimensions.get('window').width * 0.40)
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    price: {
        color: 'blue'
    },
    green: {
        color: 'green'
    },
    orange: {
        color: 'orange',
    },
    red: {
        color: 'red'
    },
    textSmall: {
        fontSize: 14
    },
    icon: {
        fontSize: 14,
        marginRight: 0
    },
    author: {
        fontStyle: 'italic'
    }
});


