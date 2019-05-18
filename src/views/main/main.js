import React, { Component } from 'react';
import { Container, Tab, Tabs, Body, Card, CardItem, Spinner, Text } from 'native-base'
import Header from '../../components/Header/header'
import Categories from './categories/categories'
import Account from './account/account'

export default class Main extends Component {

    render() {
        return (
            <Container>
                <Header title={'Libreria Maquilishuat'} />
                <Tabs>
                    <Tab heading="Categorias">
                        <Categories navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Mi Cuenta">
                        <Account navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container >
        );
    }
}