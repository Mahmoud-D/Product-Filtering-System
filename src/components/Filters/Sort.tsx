import { SetStateAction } from 'react'
import { QueryObserverResult } from '@tanstack/react-query'
import { QueryResult } from '@upstash/vector'
import { useTranslations } from 'next-intl'
import { DebouncedFunc } from 'lodash'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

import { SORT_OPTIONS } from '@/constants'
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
const Sort = ({ filter, setFilter, stableDebouncedRefetch }: TProps) => {
  const t = useTranslations('Home')
  return (
    <div className="flex items-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="group inline-flex items-center justify-center text-lg font-medium text-gray-700 hover:text-gray-900 dark:text-stone-100 dark:hover:text-stone-300">
          {t('sort')}

          <ChevronDown className="ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-stone-100 dark:hover:text-stone-300" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.name}
              className={cn(
                'block w-full px-4 py-2 text-sm dark:bg-slate-900',
                {
                  'bg-gray-100 font-bold text-gray-900 dark:bg-slate-500 dark:text-stone-100':
                    filter.sort === option.value,
                  'text-gray-300': filter.sort !== option.value
                }
              )}
              onClick={() => {
                setFilter((prev) => ({ ...prev, sort: option.value }))
                if (stableDebouncedRefetch) {
                  stableDebouncedRefetch()
                }
              }}
            >
              {t(option.name)}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Sort
