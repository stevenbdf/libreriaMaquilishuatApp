import React, { Component } from 'react';
import { Card, CardItem, Text, Spinner, Button } from 'native-base';
import { ScrollView, Image, FlatList} from 'react-native';
import Header from '../../components/Header/header'
import stylesContainer from './styles'
import model from './categoriesModel'

export default class Categories extends Component {
    state = {
        categories: undefined
    }

    async componentDidMount() {
        model.loadCategories(this)
    }

    goAllCategories = (idCat, title) => {
        this.props.navigation.navigate('AllCategories', {idCat, title});
    }

    keyExtractor = (item, index) => {
        return (this.state.categories[index].idCategoria)
    }

    renderItem = ({ item, index }) => {
        return (
            <Card style={stylesContainer.styles.item}>
                <CardItem cardBody style={stylesContainer.styles.itemCard}>
                    <Image style={stylesContainer.styles.itemTextContainer} 
                           source={{ uri: `http://192.168.1.7/libreria-maquilishuat/resources/img/categories/${item.img}`}}
                           style={stylesContainer.styles.cardImage} />
                    <Button onPress={() => this.goAllCategories(item.idCategoria,item.nombreCat)} style={stylesContainer.styles.itemText}>
                        <Text>{item.nombreCat}</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    };

    render() {
        return (
            <ScrollView>
                <Header title={'Libreria Maquilishuat - Categorias'}/>
                {
                    this.state.categories
                        ?
                        <FlatList
                            data={this.state.categories}
                            style={stylesContainer.styles.container}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                            numColumns={2}
                        />
                        :
                        <Spinner color='blue' />
                }
            </ScrollView>
        );
    }
}