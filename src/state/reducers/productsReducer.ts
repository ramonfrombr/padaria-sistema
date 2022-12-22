import { IProduct } from "../../typings";
import { ProductAction } from "../actions";
import { ProductActionTypes } from "../actions-types";

const initialState: IProduct[] = []

const reducer = (state: IProduct[] = initialState, action: ProductAction) => {
  switch(action.type) {
    case ProductActionTypes.CREATE_PRODUCT:
      return [...state, action.payload];
    case ProductActionTypes.DELETE_PRODUCT:
      return state.filter(product => product.id !== action.payload);
    case ProductActionTypes.EDIT_PRODUCT:
      return state.map(
        product => product.id === action.payload.id
        ? action.payload
        : product
      );
    default:
      return state;
  }
}


export default reducer;