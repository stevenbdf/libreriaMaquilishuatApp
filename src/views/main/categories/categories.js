import React, { Component } from 'react';
import { Card, CardItem, Text, Spinner, Button } from 'native-base';
import { ScrollView, Image, FlatList, BackHandler} from 'react-native';
import stylesContainer from './styles'
import model from './categoriesModel'

export default class Categories extends Component {
    state = {
        categories: undefined
    }

    async componentDidMount() {
        model.loadCategories(this)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    goAllCategories = (idCat, title) => {
        this.props.navigation.navigate('AllCategories', {idCat, title});
    }

    keyExtractor = (item, index) => {
        return (this.state.categories[index].idCategoria)
    }

    handleBackButton() {
        return true;
    }

    renderItem = ({ item, index }) => {
        return (
            <Card style={stylesContainer.styles.item}>
                <CardItem cardBody style={stylesContainer.styles.itemCard}>
                    <Image style={stylesContainer.styles.itemTextContainer} 
                           source={{ uri: `http://35.229.86.167/resources/img/categories/${item.img}`}}
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
            <ScrollView style={{width: '100%'}}>
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