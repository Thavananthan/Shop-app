import React,{useEffect,useState,useCallback} from 'react';
import {View,Text,FlatList,Platform,Button,ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import * as cartAction from '../../store/actions/cart';
import ProductItem from '../../components/shop/productItem';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverview = props => {
    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const[error, setError] = useState();

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try{
            await dispatch(productsActions.fetchProducts());
        } catch(err){
            setError(err.message)
        }
        setIsRefreshing(false);
    },[dispatch,setIsLoading,setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadProducts
        );

        return () => {
            willFocusSub.remove();
        };
    },[loadProducts])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch,loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductsDetails',{
            productId: id,
            productTitle: title 
        })
    }

     if(error){
         return(
             <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                 <Text>An error occurred!</Text>
                 <Button 
                 title="Try again" 
                 onPress={loadProducts}
                 color={Colors.primary}
                 />
             </View>
         )
     }

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
            <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem 
                                     title={itemData.item.title}
                                     image={itemData.item.imageUrl} 
                                     price={itemData.item.price}
                                     onSelect={() => {
                                          selectItemHandler(itemData.item.id, itemData.item.title)
                                        }}
                                       
                                        >
                                        <Button 
                                           title="View Details"
                                           color={Colors.primary} 
                                           onPress={() => {selectItemHandler(itemData.item.id, itemData.item.title)}
                                        }/>
                                        <Button 
                                        title="To Cart"   
                                        color={Colors.primary} 
                                        onPress={() => { 
                                            dispatch( cartAction.addToCart(itemData.item))
                                        }}/>
                                    </ProductItem> }
            />
            );
}

ProductsOverview.navigationOptions = navData =>{
    return{
    headerTitle: 'All Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Menu" 
                        iconName={Platform.OS === 'andriod' ? 'md-menu':'ios-menu'} 
                        onPress={() =>{navData.navigation.toggleDrawer();}}
                />
                </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Cart" 
                          iconName={Platform.OS === 'andriod' ? 'md-cart':'ios-cart'} 
                          onPress={() =>{navData.navigation.navigate('Cart')}}
                 />
                </HeaderButtons>
    }            
}

export default ProductsOverview;