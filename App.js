import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CategoriesScreen from './src/views/categories/categories'
import TabsComponent from './src/views/tabs/tabs';
import AllCategoriesScreen from './src/views/allCategories/allCategories'
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: componentWill', 'Remote debugger']);

class HomeScreen extends React.Component {
  render() {
    return (
      <TabsComponent navigation = {this.props.navigation}/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Categories: CategoriesScreen,
  AllCategories: AllCategoriesScreen
}, { headerMode: 'none', initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);