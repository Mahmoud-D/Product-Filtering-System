import { SetStateAction } from 'react'
import { QueryObserverResult } from '@tanstack/react-query'
import { QueryResult } from '@upstash/vector'
import { useTranslations } from 'next-intl'
import { DebouncedFunc } from 'lodash'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import { Slider } from '../ui/slider'

import { DEFAULT_CUSTOM_RANGE, PRICE_FILTERS } from '@/constants'
import { cn } from '@/lib/utils'
import { TProductState } from '@/lib/validators/product-validator'
import { TProduct } from '@/types'

type TProps = {
  filter: TProductState
  setFilter: (value: SetStateAction<TProductState>) => void
  stableDebouncedRefetch:
    | DebouncedFunc<
        () => Promise<QueryObserverResult<QueryResult<TProduct>[], Error>>
      >
    | undefined
}
const PriceFilter = ({ filter, setFilter, stableDebouncedRefetch }: TProps) => {
  const t = useTranslations('Home')
  const minPrice = Math.min(filter.price.range[0], filter.price.range[1])
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1])
  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-stone-100 dark:hover:text-stone-200">
        <span className="font-medium text-gray-900 dark:text-stone-100">
          {t('Price')}
        </span>
      </AccordionTrigger>
      <AccordionContent className="animate-none pt-6">
        <ul className="space-y-4">
          {PRICE_FILTERS.options.map((option, optionIdx) => (
            <li
              key={option.label}
              className="group flex cursor-pointer items-center"
            >
              <input
                type="radio"
                id={`price-${optionIdx}`}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 group-hover:cursor-pointer"
                onChange={() => {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: false,
                      range: [...option.value]
                    }
                  }))
                  if (stableDebouncedRefetch) {
                    stableDebouncedRefetch()
                  }
                }}
                checked={
                  !filter.price.isCustom &&
                  filter.price.range[0] === option.value[0] &&
                  filter.price.range[1] === option.value[1]
                }
              />
              <label
                htmlFor={`price-${optionIdx}`}
                className="mx-3 text-sm text-gray-600 group-hover:cursor-pointer dark:text-stone-100"
              >
                {t(option.label)}
              </label>
            </li>
          ))}
          <li className="group flex cursor-pointer flex-col justify-center">
            <div>
              <input
                type="radio"
                id={`price-${PRICE_FILTERS.options.length}`}
                onChange={() => {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: true,
                      range: [0, 100]
                    }
                  }))
                  if (stableDebouncedRefetch) {
                    stableDebouncedRefetch()
                  }
                }}
                checked={filter.price.isCustom}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`price-${PRICE_FILTERS.options.length}`}
                className="mx-3 cursor-pointer text-sm text-gray-600 dark:text-stone-100"
              >
                {t('Custom')}
              </label>
            </div>

            <div className="mb-2 mt-2 flex items-center justify-between">
              <p className="font-medium">{t('Price')}</p>
              <div>
                {filter.price.isCustom
                  ? minPrice.toFixed(0)
                  : filter.price.range[0].toFixed(0)}
                $ -
                {filter.price.isCustom
                  ? maxPrice.toFixed(0)
                  : filter.price.range[1].toFixed(0)}
                $
              </div>
            </div>
            <Slider
              className={cn({
                'opacity-50': !filter.price.isCustom
              })}
              min={DEFAULT_CUSTOM_RANGE[0]}
              max={DEFAULT_CUSTOM_RANGE[1]}
              defaultValue={DEFAULT_CUSTOM_RANGE}
              step={5}
              value={
                filter.price.isCustom
                  ? filter.price.range
                  : DEFAULT_CUSTOM_RANGE
              }
              disabled={!filter.price.isCustom}
              onValueChange={(range) => {
                const [minValue, maxValue] = range
                setFilter((prev) => ({
                  ...prev,
                  price: {
                    ...prev.price,
                    range: [minValue, maxValue]
                  }
                }))
                if (stableDebouncedRefetch) {
                  stableDebouncedRefetch()
                }
              }}
            />
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default PriceFilter
