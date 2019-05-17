import React, { Component } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Item,Text, Input, Label, Button, Icon, Content} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

export default class Register extends Component {
    state = {
        photo: null,
        data: null,
        name: '',
        lastName: '',
        email: '',
        password: '' ,
        password2: '',
        address: ''
    }

    handleChoosePhoto = () => {
        ImagePicker.showImagePicker(null, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source)
                this.setState({
                    photo: source,
                    data: response.data,
                    height: response.height,
                    width: response.width,
                    fileName: response.fileName
                });
            }
        });
    }


    handleUploadPhoto = async () => {
        RNFetchBlob.fetch('POST', 'http://192.168.1.7/libreria-maquilishuat/core/api/clientes.php?site=public&action=register', {
            Authorization: "Bearer access-token",
        }, [
                { name: 'imagen', filename: this.state.fileName, data: this.state.data },
                { name: 'nombres', data: this.state.name },
                { name: 'apellidos', data: this.state.lastName },
                { name: 'correo', data: this.state.email },
                { name: 'direccion', data: this.state.address },
                { name: 'clave1', data: this.state.password},
                { name: 'clave2', data: this.state.password2 }
            ]
        )
            .then((resp) => {
                console.log(resp.data)
                const respuestaTraducida = JSON.parse(resp.data)
                if (respuestaTraducida.status == 1) {
                    console.log(respuestaTraducida.data);
                    alert('Te has registrado correctamente.')
                } else {
                    alert(respuestaTraducida.exception);
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    render() {
        const { photo } = this.state
        return (
            <ScrollView style={{ width: '100%'}}>
                <Item floatingLabel>
                    <Label>Nombre</Label>
                    <Input
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    />
                </Item>
                <Item floatingLabel style={{ marginTop: 15}}>
                    <Label>Apellido</Label>
                    <Input
                        onChangeText={(text) => this.setState({ lastName: text })}
                        value={this.state.lastName}
                    />
                </Item>
                <Item floatingLabel style={{ marginTop: 15}}>
                    <Label>Correo electronico</Label>
                    <Input 
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
                <Item floatingLabel style={{ marginTop: 20 }}>
                    <Label>Confirma tu contraseña</Label>
                    <Input secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password2: text })}
                        value={this.state.password2}
                    />
                </Item>
                <Item floatingLabel style={{ marginTop: 15, marginBottom: 20}}>
                    <Label>Dirección</Label>
                    <Input
                        onChangeText={(text) => this.setState({ address: text })}
                        value={this.state.address}
                    />
                </Item>
                {photo && (
                    <React.Fragment>
                        <View style={{ marginBottom: 15 }}>
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                    </React.Fragment>
                )}
                <Button primary
                    onPress={() => this.handleChoosePhoto()}
                    style={{ marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text> Seleccionar foto </Text>
                    <Icon type="FontAwesome" name='image' />
                </Button>
                <Button primary
                    onPress={() => this.handleUploadPhoto()}
                    style={{ marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text> Registrarse </Text>
                    <Icon type="FontAwesome" name='send' />
                </Button>
            </ScrollView>
        )
    }
}