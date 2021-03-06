import React from 'react';
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartAction from '../../store/actions/cart';


const ProductDetails = props => {

    const proudctId = props.route.params ? props.route.params.productId:null;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id ===proudctId));
    const dispatch = useDispatch();


    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
             <Button style={Colors.primary} title="Add to Cart" onPress={() =>{dispatch(cartAction.addToCart(selectedProduct))}}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

export const screenOptions = navData => {
    return {
      headerTitle: navData.route.params ? navData.route.params.productTitle:null
    };
};

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold'

    },
    description:{
        fontFamily:'open-sans',
        fontSize:14,
        textAlign:'center'
    },
    actions:{
        marginVertical:10,
        alignItems:'center',
        marginHorizontal:20
    }

})

export default ProductDetails