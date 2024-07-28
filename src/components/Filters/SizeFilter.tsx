import { useTranslations } from 'next-intl'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'

import { SIZE_FILTERS } from '@/constants'
import { TProductState } from '@/lib/validators/product-validator'

type TProps = {
  applyArrayFilter: ({
    category,
    value
  }: {
    category: keyof Pick<TProductState, 'color' | 'size'>
    value: string
  }) => void
  filter: TProductState
}
const SizeFilter = ({ applyArrayFilter, filter }: TProps) => {
  const t = useTranslations('Home')
  return (
    <AccordionItem value="size">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900 dark:text-stone-100">
          {t('Size')}
        </span>
      </AccordionTrigger>

      <AccordionContent className="animate-none pt-6">
        <ul className="space-y-4">
          {SIZE_FILTERS.options.map((option, optionIdx) => (
            <li
              key={option.value}
              className="group flex cursor-pointer items-center"
            >
              <input
                type="checkbox"
                id={`size-${optionIdx}`}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 group-hover:cursor-pointer"
                onChange={() => {
                  applyArrayFilter({
                    category: 'size',
                    value: option.value
                  })
                }}
                checked={filter.size.includes(option.value)}
              />

              <label
                htmlFor={`size-${optionIdx}`}
                className="mx-3 text-sm text-gray-600 group-hover:cursor-pointer dark:text-stone-100"
              >
                {t(option.label)}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default SizeFilter
