import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import {Platform,SafeAreaView,Button,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux'


import ProductOverview , {
    screenOptions as productsOverviewScreenOptions
  } from '../screens/shop/ProductOverview';
import ProductDetails, {
    screenOptions as productDetailScreenOptions
  } from '../screens/shop/ProductDetails';
import OrdersScreen, {
    screenOptions as ordersScreenOptions
  } from '../screens/shop/OrderScreen';
import CartScreen, {
    screenOptions as cartScreenOptions
  } from '../screens/shop/CartScreen'
import Colors from '../constants/Colors';
import UserProductsScreen, {
    screenOptions as userProductsScreenOptions
  } from '../screens/user/UserProductScreen';
import EditProductScreen, {
    screenOptions as editProductScreenOptions
  }  from '../screens/user/EditProductScreen';
import AuthScreen,{
    screenOptions as AuthScreenOptions
  } from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

const defaultNavOptions= {
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primary :''
    },
   
    headerTintColor: Platform.OS === 'android' ? 'white': Colors.primary
}

const ProductsStackNavigator = createStackNavigator();

 const ProductsNavigator = () => {
    return (
      <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen
          name="ProductsOverview"
          component={ProductOverview}
          options={productsOverviewScreenOptions}
        />
        <ProductsStackNavigator.Screen
          name="ProductsDetails"
          component={ProductDetails}
          options={productDetailScreenOptions}
        />
        <ProductsStackNavigator.Screen
          name="Cart"
          component={CartScreen}
          options={cartScreenOptions}
        />
      </ProductsStackNavigator.Navigator>
    );
  };

// const ProductsNavigator = createStackNavigator({
//      ProductsOverview : ProductOverview,
//      ProductsDetails : ProductDetails,
//      Cart : CartScreen
// },{
//     navigationOptions: {drawerIcon:drawerConfig => (
//         <Ionicons 
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//           />
//     )},
//     defaultNavigationOptions: defaultNavOptions
// })

const OrdersStackNavigator = createStackNavigator();

 const OrdersNavigator = () => {
    return (
      <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen
          name="Orders"
          component={OrdersScreen}
          options={ordersScreenOptions}
        />
      </OrdersStackNavigator.Navigator>
    );
  };
  
// const OrdersNavigator = createStackNavigator({
//     Orders:OrdersScreen
// },{
//     navigationOptions: {drawerIcon:drawerConfig => (
//         <Ionicons 
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColor}
//           />
//     )},
//     defaultNavigationOptions:defaultNavOptions
// })

const AdminStackNavigator = createStackNavigator();

 const AdminNavigator = () => {
    return (
      <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen
          name="UserProducts"
          component={UserProductsScreen}
          options={userProductsScreenOptions}
        />
        <AdminStackNavigator.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={editProductScreenOptions}
        />
      </AdminStackNavigator.Navigator>
    );
  };

// const AdminNavigator = createStackNavigator({
//     UserProducts:UserProductsScreen,
//     EditProduct : EditProductScreen
// },{
//     navigationOptions: {drawerIcon:drawerConfig => (
//         <Ionicons 
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//           />
//     )},
//     defaultNavigationOptions:defaultNavOptions
// })

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
  
    return (
      <ShopDrawerNavigator.Navigator
        drawerContent={props => {
          return (
            <View style={{ flex: 1, paddingTop: 20 }}>
              <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItemList {...props} />
                <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate('Auth');
                  }}
                />
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary
        }}
      >
        <ShopDrawerNavigator.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
      </ShopDrawerNavigator.Navigator>
    );
  };

  const AuthStackNavigator = createStackNavigator();

  export const AuthNavigator = () => {
      return(
          <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
              <AuthStackNavigator.Screen 
              name="Auth" 
              component={AuthScreen} 
              options={AuthScreenOptions}
              />
          </AuthStackNavigator.Navigator>
      )
  }


// const ShopNavigator = createDrawerNavigator({
//     Products : ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
// },
// {
//     contentOptions:{
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//         const dispatch = useDispatch();
//         return(
//             <View style={{Flex:1, padding:20}}>
//                 <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
//                    <DrawerItems {...props}/>
//                    <Button title="logout" color={Colors.primary} onPress={() => { 
//                        dispatch(authActions.logout());
//                        }}/>
//                 </SafeAreaView>
//             </View>
//         )
//     }
// })

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// },{
//     defaultNavigationOptions: defaultNavOptions
// });

// const MainNavigator = createSwitchNavigator({
//     Startup:StartupScreen,
//     Auth: AuthNavigator,
//     Shop : ShopNavigator
// })



// export default createAppContainer(MainNavigator);