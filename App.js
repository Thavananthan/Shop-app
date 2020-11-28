import React,{useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import * as Notifications from 'expo-notifications';


import ProductsReducer from './store/reducers/products';
import CartReducer from './store/reducers/cart';
import ShopNavigator from './navigation/ShopNavigator';
import AppNavigator from './navigation/AppNavigator'
import ordersReducer from './store/reducers/order';
import AuthReducer from './store/reducers/auth';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const rootReducer = combineReducers({
   products : ProductsReducer,
   cart: CartReducer,
   orders:ordersReducer,
   auth: AuthReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk),composeWithDevTools());

const FetchFonts = () => {
  return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
      return (
        <AppLoading startAsync={FetchFonts} onFinish={() => setFontLoaded(true)}/>
      )
  }
  return (
    <Provider store={store}>
        <AppNavigator/>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
