import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Define the type for valid locales
type Locale = 'en' | 'ar' // Add all other valid locales here

// Can be imported from a shared config
const validLocales: Locale[] = ['en', 'ar'] // Make sure this matches the `locales` array

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  // Validate that the incoming locale parameter is valid
  if (!validLocales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
