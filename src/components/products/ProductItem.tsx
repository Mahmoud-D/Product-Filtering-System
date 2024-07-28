import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { TProduct } from '@/types'

type TProps = {
  product: TProduct
}

const ProductItem = ({ product }: TProps) => {
  const t = useTranslations('Home')
  return (
    <li className="group relative">
      <figure className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 dark:bg-stone-300 lg:h-80">
        <Image
          src={product.imageId}
          alt="product Image"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </figure>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-stone-300">
            {t(product.name)}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-stone-200">
            {t('Size')} {t(product.size.toUpperCase())}, {t(product.color)}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-stone-200">
          {product.price}
        </p>
      </div>
    </li>
  )
}

export default ProductItem
