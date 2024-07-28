import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from './config/locale'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|.*\\..*).*)']
}