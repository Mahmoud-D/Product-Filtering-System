import { QueryResult } from "@upstash/vector";

import ProductItem from "./ProductItem";
import EmptyState from "./EmptyState";
import ProductSkeleton from "./ProductSkeleton";

import { TProduct } from "@/types";

type TProps = {
  products: QueryResult<TProduct>[] | undefined;
};

const ProductList = ({ products }: TProps) => {
  return (
    <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
      {products && products.length === 0 ? (
        <EmptyState />
      ) : products ? (
        products?.map((product) => (
          <ProductItem product={product.metadata!} key={product.id} />
        ))
      ) : (
        new Array(12).fill(0).map((_, index) => <ProductSkeleton key={index} />)
      )}
    </ul>
  );
};

export default ProductList;
