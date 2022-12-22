import { IOrder, IProduct } from '../../typings'
import {ProductActionTypes} from '../actions-types'
import {OrderActionTypes} from '../actions-types'

interface CreateProductAction {
  type: ProductActionTypes.CREATE_PRODUCT
  payload: IProduct
}

interface DeleteProductAction {
  type: ProductActionTypes.DELETE_PRODUCT
  payload: string
}

interface EditProductAction {
  type: ProductActionTypes.EDIT_PRODUCT
  payload: IProduct
}

export type ProductAction = CreateProductAction | DeleteProductAction | EditProductAction


interface CreateOrderAction {
  type: OrderActionTypes.CREATE_ORDER
  payload: IOrder
}

export type OrderAction = CreateOrderAction