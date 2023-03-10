import { Heading } from "@aprendaagora/simple-react-component-library";
import React, { FC } from "react";
import Product from "./Product";

interface ListOfProductsProps {
  products: IProduct[];
}

const ListOfProducts: FC<ListOfProductsProps> = ({
  products,
}: /*deleteProduct,*/
ListOfProductsProps) => {
  return (
    <div className="mx-1 my-2 border bg-white p-3">
      <Heading text="Lista de Produtos" level={4} />

      <p>Número de Produtos: {products.length}</p>
      <div className="grid grid-cols-4 gap-1 [&>span]:self-center">
        {products.length ? (
          <>
            <span className="font-bold">Imagem</span>
            <span className="p-2 font-bold">Nome</span>
            <span className="p-2 font-bold">Preço (R$)</span>
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
