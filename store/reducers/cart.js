import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/order';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';
const initialState = {
    items:{},
    totalAmount:0
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            const pushToken = addedProduct.pushToken;


            let updateOrNewCartItem;

            if(state.items[addedProduct.id]){
                //already have item in the cart 
                 updateOrNewCartItem = new CartItem( 
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    pushToken,
                    state.items[addedProduct.id].sum + prodPrice
                    )  
            }else{
                 updateOrNewCartItem = new CartItem(
                     1,
                     prodPrice,
                     prodTitle,
                     pushToken,
                     prodPrice,                    
                     );              
            }
            return {
                ...state,
                items:{...state.items,[addedProduct.id]: updateOrNewCartItem},
                totalAmount : state.totalAmount + prodPrice
            }
         case REMOVE_FROM_CART:
             const selectedCartItem = state.items[action.pid];
             const currentQty = selectedCartItem.quantity;

             let updateCartItems;

             if(currentQty > 1){
                     updateCartItem = new CartItem(selectedCartItem.quantity -1, 
                                                         selectedCartItem.productPrice, 
                                                         selectedCartItem.productTitle,
                                                         selectedCartItem.sum-selectedCartItem.productPrice
                                                         );
                      updateCartItems = {...state.items, [action.pid]: updateCartItem };  
             } else {
                 updateCartItems = {...state.items};
                 delete updateCartItems[action.pid];
             }  
             return{
                 ...state,
                 items: updateCartItems,
                 totalAmount: state.totalAmount - selectedCartItem.productPrice
             }

          case ADD_ORDER:
               return initialState;   
           case DELETE_PRODUCT:
               if(!state.items[action.pid]){
                   return state;
               }  
               const updatedItems = {...state.items};
               const itemTotal = state.items[action.pid].sum;
               delete updatedItems[action.pid];     
               return{
                   ...state,
                   items:updatedItems,
                   totalAmount: state.totalAmount - itemTotal 
               }
    }
    return state;
}