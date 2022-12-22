import { IOrder } from "../../typings";
import { OrderAction } from "../actions";
import { OrderActionTypes } from "../actions-types";

const initialState: IOrder[] = []

const reducer = (state: IOrder[] = initialState, action: OrderAction) => {
  switch(action.type) {
    case OrderActionTypes.CREATE_ORDER:
      return [...state, action.payload];
    default:
      return state;
  }
}


export default reducer;