import Image from "next/image";
import { TProduct } from "@/types";

type TProps = {
  product: TProduct;
};

const ProductItem = ({ product }: TProps) => {
  return (
    <li className="group relative">
      <figure className="aspect-h-1 aspect-w-1 w-full overflow-hidden dark:bg-stone-300 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={product.imageId}
          alt="product Image"
          width={500}
          height={500}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm dark:text-stone-300 text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm dark:text-stone-200 text-gray-500">
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </li>
  );
};

export default ProductItem;
