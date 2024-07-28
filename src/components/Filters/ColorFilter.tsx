import { useTranslations } from 'next-intl'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'

import { COLOR_FILTERS } from '@/constants'
import { TProductState } from '@/lib/validators/product-validator'

type TProps = {
  filter: TProductState
  applyArrayFilter: ({
    category,
    value
  }: {
    category: keyof Pick<TProductState, 'color' | 'size'>
    value: string
  }) => void
}
const ColorFilter = ({ applyArrayFilter, filter }: TProps) => {
  const t = useTranslations('Home')
  return (
    <AccordionItem value="color">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-stone-100">
        <span className="font-medium text-gray-900 dark:text-stone-100">
          {t('Color')}
        </span>
      </AccordionTrigger>
      <AccordionContent className="animate-none pt-6">
        <ul className="space-y-4">
          {COLOR_FILTERS.options.map((option, optionIdx) => (
            <li
              key={option.value}
              className="group flex cursor-pointer items-center"
            >
              <input
                type="checkbox"
                id={`color-${optionIdx}`}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 group-hover:cursor-pointer"
                onChange={() => {
                  applyArrayFilter({
                    category: 'color',
                    value: option.value
                  })
                }}
                checked={filter.color.includes(option.value)}
              />
              <label
                htmlFor={`color-${optionIdx}`}
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

export default ColorFilter
