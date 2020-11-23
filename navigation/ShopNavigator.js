import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import{createAppContainer,createSwitchNavigator} from 'react-navigation'
import {Platform,SafeAreaView,Button,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux'


import ProductOverview from '../screens/shop/ProductOverview';
import UserProductScreen from '../screens/user/UserProductScreen';
import ProductDetails from '../screens/shop/ProductDetails';
import OrdersScreen from '../screens/shop/OrderScreen';
import CartScreen from '../screens/shop/CartScreen'
import Colors from '../constants/Colors';
import UserProductsScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import StartupScreen from '../screens/user/StartupScreen';
import AuthScreen from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

const defaultNavOptions= {
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primary :''
    },
   
    headerTintColor: Platform.OS === 'android' ? 'white': Colors.primary
}

const ProductsNavigator = createStackNavigator({
     ProductsOverview : ProductOverview,
     ProductsDetails : ProductDetails,
     Cart : CartScreen
},{
    navigationOptions: {drawerIcon:drawerConfig => (
        <Ionicons 
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
          />
    )},
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders:OrdersScreen
},{
    navigationOptions: {drawerIcon:drawerConfig => (
        <Ionicons 
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
          />
    )},
    defaultNavigationOptions:defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts:UserProductsScreen,
    EditProduct : EditProductScreen
},{
    navigationOptions: {drawerIcon:drawerConfig => (
        <Ionicons 
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
          />
    )},
    defaultNavigationOptions:defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},
{
    contentOptions:{
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return(
            <View style={{Flex:1, padding:20}}>
                <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
                   <DrawerItems {...props}/>
                   <Button title="logout" color={Colors.primary} onPress={() => { 
                       dispatch(authActions.logout());
                       }}/>
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
    Startup:StartupScreen,
    Auth: AuthNavigator,
    Shop : ShopNavigator
})



export default createAppContainer(MainNavigator);