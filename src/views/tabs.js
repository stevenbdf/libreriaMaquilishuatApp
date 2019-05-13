import React, { Component } from 'react';
import {
    Container, Header, Tab,
    Tabs, Body, Title,
    Card, CardItem
}
    from 'native-base'
import Login from './login'
import Register from './register'
import axios from '../axios'

export default class TabsComponent extends Component {
    async componentDidMount() {
        const res = await axios.get(`clientes.php?site=public&action=checkSession`)
        if (res.data.status) {
            this.props.navigation.navigate('Categories');
        } else {
            console.log('NO estas logeado')
        }
    }
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Body>
                        <Title>Libreria Maquilishuat</Title>
                    </Body>
                </Header>
                <Tabs>
                    <Tab heading="Login">
                        <Card>
                            <CardItem>
                                <Body>
                                    <Login navigation={this.props.navigation} />
                                </Body>
                            </CardItem>
                        </Card>
                    </Tab>
                    <Tab heading="Registro">
                        <Card>
                            <CardItem>
                                <Body>
                                    <Register />
                                </Body>
                            </CardItem>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}