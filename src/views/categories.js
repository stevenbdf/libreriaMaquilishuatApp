import React, { Component } from 'react';
import { Card, CardItem, Text, Header, Body, Title } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, StyleSheet, ScrollView, Image, FlatList, Dimensions } from 'react-native'
import axios from '../axios';

const numColumns = 2;

export default class Categories extends Component {
    state = {
        categories: undefined
    }
    async componentDidMount() {
        console.log(Dimensions.get('window').width)
        const res = await axios.get(`categorias.php?site=public&action=readCategoria`)
        if (res.data) {
            const respuesta = res.data.dataset;
            this.setState({
                categories: respuesta
            })
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <Card style={styles.item}>
                <CardItem cardBody style={styles.itemCard}>
                    <Image style={styles.itemTextContainer} source={{ uri: `http://192.168.1.7/libreria-maquilishuat/resources/img/categories/${item.img}` }} style={{ height: 200, width: 200, flex: 1 }} />
                    <Text style={styles.itemText}>{item.nombreCat}</Text>
                </CardItem>
            </Card>
        );
    };

    render() {
        return (
            <ScrollView>
                <Header hasTabs>
                    <Body>
                        <Title>Libreria Maquilishuat - Categorias</Title>
                    </Body>
                </Header>
                {
                    this.state.categories != undefined
                    &&
                    <FlatList
                        data={this.state.categories}
                        style={styles.container}
                        renderItem={this.renderItem}
                        numColumns={numColumns}
                    />
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flex: 1,
        height: (Dimensions.get('window').width / 2), // approximate a square
        position: 'relative',
        margin: 7,
        borderRadius: 7,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 7,
    },
    itemTextContainer: {
        flex: 1,
        position: 'relative'
    },
    itemCard: {
        borderRadius: 10
    },
    itemText: {
        flex: 1,
        color: '#fff',
        backgroundColor: 'rgba(33, 37, 41, 0.80)',
        position: 'absolute',
        width: '85%',
        marginLeft: '7.5%',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: 7,
        overflow: 'hidden',
    },
});
