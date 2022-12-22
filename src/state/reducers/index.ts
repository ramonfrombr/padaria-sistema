import {combineReducers} from 'redux';
import productsReducer from './productsReducer';
import ordersReducer from './ordersReducer'

const reducers = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
})

export default reducers;


export type State = ReturnType<typeof reducers>