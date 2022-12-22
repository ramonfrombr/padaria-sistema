import { OrderActionTypes, ProductActionTypes } from "../actions-types";
import {Dispatch} from 'redux';
import { OrderAction, ProductAction } from "../actions";
import { IOrder, IProduct } from "../../typings";

export const createProduct = (product: IProduct) => {
  return (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT,
      payload: product
    })
  }
}

export const deleteProduct = (productId: string) => {
  return (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: productId
    })
  }
}

export const editProduct = (product: IProduct) => {
  return (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.EDIT_PRODUCT,
      payload: product
    })
  }
}


export const createOrder = (order: IOrder) => {
  return (dispatch: Dispatch<OrderAction>) => {
    dispatch({
      type: OrderActionTypes.CREATE_ORDER,
      payload: order
    })
  }
}