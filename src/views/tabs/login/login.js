import React, { Component } from 'react';
import { Text, Item, Input, Label, Button, Icon, View } from 'native-base';
import model from './loginModel'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    login = () => {
        model.sendLoginData(this.state.email, this.state.password, this)
    }

    logout = async () => {
        model.logout()
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <Item floatingLabel>
                    <Label>Correo electronico</Label>
                    <Input keyboardType="email-address"
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                </Item>
                <Item floatingLabel style={{ marginTop: 20 }}>
                    <Label>Contraseña</Label>
                    <Input secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </Item>
                <Button primary
                    onPress={() => this.login()}
                    style={{ marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text> Ingresar </Text>
                    <Icon type="FontAwesome" name='send' />
                </Button>
                <Button primary
                    onPress={() => this.logout()}
                    style={{ marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text>Logout</Text>
                    <Icon type="FontAwesome" name='times' />
                </Button>
            </View>
        );
    }
}

