import React from 'react'
import CategoriesScreen from './src/views/categories'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabsComponent from './src/views/tabs';

class HomeScreen extends React.Component {
  render() {
    return (
      <TabsComponent navigation = {this.props.navigation}/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Categories: CategoriesScreen 
}, { headerMode: 'none', initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);