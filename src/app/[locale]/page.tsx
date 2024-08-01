'use client'
import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QueryResult } from '@upstash/vector'
import { useTranslations } from 'next-intl'
import axios from 'axios'
import debounce from 'lodash.debounce'

import Nav from '@/components/Nav'
import Sort from '@/components/Filters/Sort'
import SubCategories from '@/components/Filters/SubCategories'
import ColorFilter from '@/components/Filters/ColorFilter'
import SizeFilter from '@/components/Filters/SizeFilter'
import PriceFilter from '@/components/Filters/PriceFilter'
import ProductList from '@/components/products/ProductList'
import { Accordion } from '@/components/ui/accordion'

import { DEFAULT_CUSTOM_RANGE } from '@/constants'
import { TProductState } from '@/lib/validators/product-validator'
import { TProduct } from '@/types'

export default function Home() {
  const [filter, setFilter] = useState<TProductState>({
    color: ['white', 'beige', 'blue', 'green', 'purple'],
    size: ['S', 'M', 'L'],
    price: { isCustom: false, range: DEFAULT_CUSTOM_RANGE },
    sort: 'none'
  })

  const t = useTranslations('Home')

  const { data: products, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const BASE_URL = process.env.BASE_URL
      const { data } = await axios.post<QueryResult<TProduct>[]>(
        `${BASE_URL}/api/products`,
        {
          filter: {
            sort: filter.sort,
            color: filter.color,
            size: filter.size,
            price: filter.price.range
          },
          staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
          cacheTime: 30 * 60 * 1000 // Cache the data for 30 minutes
        }
      )

      return data
    }
  })

  const triggerRefetch = () => refetch()
  const debouncedRefetch = debounce(triggerRefetch, 600)
  const stableDebouncedRefetch = useCallback(debouncedRefetch, [])

  const applyArrayFilter = ({
    category,
    value
  }: {
    category: keyof Pick<typeof filter, 'color' | 'size'>
    value: string
  }) => {
    const isFilterApplied = filter[category].includes(value as never)

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value)
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value]
      }))
    }

    stableDebouncedRefetch()
  }

  return (
    <main className="mx-auto max-w-7xl px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <Nav />
      <header className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-stone-100">
          {t('title')}
        </h1>
        <Sort
          filter={filter}
          setFilter={setFilter}
          stableDebouncedRefetch={stableDebouncedRefetch}
        />
      </header>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block">
            <SubCategories />
            <Accordion type="multiple" className="animate-none">
              {/* Color filter */}
              <ColorFilter
                filter={filter}
                applyArrayFilter={applyArrayFilter}
              />

              {/* Size filter */}
              <SizeFilter filter={filter} applyArrayFilter={applyArrayFilter} />

              {/* Price filter */}
              <PriceFilter
                filter={filter}
                setFilter={setFilter}
                stableDebouncedRefetch={stableDebouncedRefetch}
              />
            </Accordion>
          </div>

          {/* Product grid */}
          <ProductList products={products} />
        </div>
      </section>
    </main>
  )
}
