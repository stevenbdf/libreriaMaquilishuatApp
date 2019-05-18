import React, { Component } from 'react';
import { Button, Text } from 'native-base'
import { ScrollView } from 'react-native'
import model from './accountModel'

export default class Account extends Component {

    render() {
        return (
            <ScrollView>
                <Button onPress={() => model.logout(this)}>
                    <Text>Cerrar Sesión</Text>
                </Button>
            </ScrollView>
        );
    }
}