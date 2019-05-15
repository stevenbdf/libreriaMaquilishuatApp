import React, { Component } from 'react';
import {
    Container, Header, Tab,
    Tabs, Body, Title,
    Card, CardItem, Spinner
}
    from 'native-base'
import Login from '../components/login'
import Register from '../components/register'
import axios from '../axios'

export default class TabsComponent extends Component {
    state = {
        render: false
    }
    async componentDidMount() {
        const res = await axios.get(`clientes.php?site=public&action=checkSession`)
        if (res.data.status) {
            this.props.navigation.navigate('Categories');
        } else {
            console.log('NO estas logeado')
            this.setState({
                render: true
            })
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
                {
                    this.state.render
                        ?
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
                        :
                        <Spinner color='blue' />
                }
            </Container >
        );
    }
}