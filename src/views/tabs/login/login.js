import React, { Component } from 'react';
import {
    Text, Item, Input, Label, Button, Icon, View
} from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from '../../../utils/axios/axios';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    printState = () => {
        RNFetchBlob.fetch('POST', 'http://192.168.1.7/libreria-maquilishuat/core/api/clientes.php?site=public&action=login', {
            Authorization: "Bearer access-token",
        }, [
                { name: 'correo', data: this.state.email },
                { name: 'contrasena', data: this.state.password }
            ]
        )
            .then((resp) => {
                console.log(resp.data)
                const respuestaTraducida = JSON.parse(resp.data);
                if (respuestaTraducida.status == 1) {
                    console.log(respuestaTraducida.data);
                    this.props.navigation.navigate('Categories');
                } else {
                    alert(respuestaTraducida.exception);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    logout = async () => {
        const res = await axios.get(`clientes.php?site=public&action=logoutApp`)
        if (res.data.status) {
            alert('Has cerrado sesion')
        } else {
            alert('Error al cerrar sesion')
        }
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
                    onPress={() => this.printState()}
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

