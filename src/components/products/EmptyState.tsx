import { useTranslations } from 'next-intl'
import { XCircle } from 'lucide-react'

const EmptyState = () => {
  const t = useTranslations('Home')
  return (
    <div className="relative col-span-full flex h-80 w-full flex-col items-center justify-center bg-gray-50 p-12">
      <XCircle className="h-10 w-10 text-red-500" />
      <h3 className="my-2 text-3xl font-bold capitalize text-stone-900">
        {t('No products found')}
      </h3>
      <p className="text-sm capitalize text-zinc-500">
        {t(
          'No search results match your query. Please adjust your search and try again.'
        )}
      </p>
    </div>
  )
}

export default EmptyState
