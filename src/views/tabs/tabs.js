import React, { Component } from 'react';
import { Container, Tab, Tabs, Body, Card, CardItem, Spinner } from 'native-base'
import Login from './login/login'
import Register from './register/register'
import Header from '../../components/Header/header'
import model from './tabsModel'

export default class TabsComponent extends Component {
    state = {
        render: true
    }
    async componentDidMount() {
        await model.checkSession(this)
        console.log('enter')
    }
    render() {
        return (
            <Container>
                <Header title={'Libreria Maquilishuat'} />
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