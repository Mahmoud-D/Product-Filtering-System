'use client'

import { useLocale, useTranslations } from 'next-intl'

import { locales } from '@/config/locale'
import { usePathname, useRouter } from '@/lib/navigation'

const LangSwitcher = () => {
  const t = useTranslations('SwitchLang')
  const router = useRouter()
  const pathname = usePathname()
  const local = useLocale()

  function handleLocaleChange(locale: 'en' | 'ar') {
    router.push(pathname, { locale })
  }

  return (
    <div className="flex gap-2">
      {locales?.map((item) => (
        <button
          key={item}
          onClick={() => handleLocaleChange(item as 'en' | 'ar')}
          className={`h-10 rounded-md px-4 py-2 text-sm font-bold ${
            local === item
              ? 'bg-sky-900 text-white hover:bg-sky-800'
              : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-slate-700 dark:text-white'
          }`}
        >
          {t('locale', { locale: item })}
        </button>
      ))}
    </div>
  )
}

export default LangSwitcher
