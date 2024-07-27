// Filter Constants
export const SORT_OPTIONS = [
  { name: 'None', value: 'none' },
  { name: 'Low to High', value: 'price-asc' },
  { name: 'High to Low', value: 'price-desc' }
] as const

export const COLOR_FILTERS = {
  id: 'color',
  name: 'Color',
  options: [
    { value: 'white', label: 'White' },
    { value: 'beige', label: 'Beige' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' }
  ] as const
}

export const SIZE_FILTERS = {
  id: 'size',
  name: 'Size',
  options: [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' }
  ]
} as const

export const PRICE_FILTERS = {
  id: 'price',
  name: 'Price',
  options: [
    { value: [0, 100], label: 'Any price' },
    {
      value: [0, 20],
      label: 'Under 20€'
    },
    {
      value: [0, 40],
      label: 'Under 40€'
    }
    // custom option defined in JSX
  ]
} as const

export const SUBCATEGORIES = [
  { name: 'T-Shirts', selected: true, href: '#' },
  { name: 'Hoodies', selected: false, href: '#' },
  { name: 'Sweatshirts', selected: false, href: '#' },
  { name: 'Accessories', selected: false, href: '#' }
]
export const DEFAULT_CUSTOM_RANGE = [0, 100] as [number, number]

// Product Validators Constants
export const AVAILABLE_SIZES = ['S', 'M', 'L'] as const

export const AVAILABLE_COLORS = [
  'white',
  'beige',
  'green',
  'purple',
  'blue'
] as const

export const AVAILABLE_SORT = ['none', 'price-asc', 'price-desc'] as const
