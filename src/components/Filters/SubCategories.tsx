import { useTranslations } from 'next-intl'
import { SUBCATEGORIES } from '@/constants'

const SubCategories = () => {
  const t = useTranslations('Home')
  return (
    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-stone-100">
      {SUBCATEGORIES.map((category) => (
        <li key={category.name}>
          <button
            disabled={!category.selected}
            className="disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t(category.name)}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SubCategories
