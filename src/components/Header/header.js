import React from 'react';
import { Header, Body, Title } from 'native-base'

export default HeaderComponent = (props) => {
    return (
        <Header noShadow>
            {props.children}
            <Body>
                <Title>{props.title}</Title>
            </Body>
        </Header>
    )
}

HeaderComponent.defaultProps = {
    title: ''
}