import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import TabsComponent from './src/views/tabs/tabs'
import MainScreen from './src/views/main/main'
import AllCategoriesScreen from './src/views/main/categories/allCategories/allCategories'
import Product from './src/views/main/categories/allCategories/product/product'
import EditComment from './src/views/main/categories/allCategories/product/editComment/editComment'
import { YellowBox } from 'react-native'

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
  Main: MainScreen,
  AllCategories: AllCategoriesScreen,
  Product: Product,
  EditComment: EditComment
}, { headerMode: 'none', initialRouteName: 'Product'});

export default createAppContainer(AppNavigator);