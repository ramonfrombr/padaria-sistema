import React, { FC } from "react";
import Product from "./Product";

interface ListOfProductsProps {
  products: IProduct[];
}

const ListOfProducts: FC<ListOfProductsProps> = ({
  products,
  /*deleteProduct,*/
}: ListOfProductsProps) => {

  return (
    <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
      <h1>Lista de Produtos</h1>

      <p>Número de Produtos: {products.length}</p>
      <div className="grid grid-cols-4 gap-1 [&>span]:self-center">
        {products.length ? (
          <>
            <span className="font-bold">Imagem</span>
            <span className="font-bold p-2">Nome</span>
            <span className="font-bold p-2">Preço (R$)</span>
            <span className="font-bold">Opções</span>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </>
        ) : (
          <p className="col-span-3">Não há nenhum produto registrado.</p>
        )}
      </div>
    </div>
  );
};

export default ListOfProducts;
