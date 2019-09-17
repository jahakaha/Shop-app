import { combineReducers } from 'redux';
import { products } from '../../../Products';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer
});

export default rootReducer;