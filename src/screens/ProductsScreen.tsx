// Libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

// Utilities
import { actionsCreators, State } from "../state";
// Components
import CreateProduct from "../components/CreateProduct";
import ListOfProducts from "../components/ListOfProducts";

const ProductsScreen = () => {
  const dispatch = useDispatch();

  const { createProduct, deleteProduct } = bindActionCreators(
    actionsCreators,
    dispatch
  );

  const products = useSelector((state: State) => state.products);

  return (
    <div>
      <ListOfProducts products={products} deleteProduct={deleteProduct} />
      <CreateProduct createProduct={createProduct} />
      <h1>All rights reserved</h1>
    </div>
  );
};

export default ProductsScreen;
