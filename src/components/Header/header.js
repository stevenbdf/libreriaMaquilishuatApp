import React from 'react';
import { Header, Body, Title } from 'native-base'

export default HeaderComponent = (props) => {
    return (
        <Header>
            <Body>
                <Title>{props.title}</Title>
                {props.children}
            </Body>
        </Header>
    )
}

HeaderComponent.defaultProps = {
    title: ''
}