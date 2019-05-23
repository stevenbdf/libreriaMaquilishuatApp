import React, { Component } from 'react';
import HeaderComponent from '../../../../../../components/Header/header'
import stylesContainer from '../styles'
import { View } from 'react-native'
import { Button, Text, Icon, Textarea } from 'native-base'
import model from './editCommentModel'

const styles = stylesContainer.styles;

export default class EditComment extends Component {
    state = {
        idComment: undefined,
        newComment: undefined,
        idClient: undefined,
        thisProduct: undefined
    }

    componentDidMount() {
        this.setState({
            idComment: this.props.navigation.getParam('idComentario'),
            newComment: this.props.navigation.getParam('comentario'),
            idClient: this.props.navigation.getParam('idCliente'),
            thisProduct: this.props.navigation.getParam('context')
        });
    }
    render() {
        return (
            <View>
                <HeaderComponent title={'Libreria Maquilishuat'}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon type="FontAwesome" name='arrow-left' style={styles.icon} />
                        <Text style={styles.textSmall}>Volver</Text>
                    </Button>
                </HeaderComponent>
                <View style={styles.viewContainer}>
                    {
                        this.state.idComment
                        &&
                        <View style={styles.flexColumn}>
                            <Text style={[styles.title, styles.green]}>
                                Editar Comentario
                        </Text>
                            <Textarea rowSpan={4} bordered placeholder="Escribe un comentario..."
                                onChangeText={(text) => this.setState({ newComment: text })}
                                value={this.state.newComment}
                            />
                            <View style={styles.sendCommentButton}>
                                <Button success onPress={() => model.updateComment(this, this.state.thisProduct)}>
                                    <Text>Modificar</Text>
                                    <Icon type="FontAwesome" name='send' />
                                </Button>
                            </View>
                        </View>
                    }
                </View>
            </View>
        )
    }
}