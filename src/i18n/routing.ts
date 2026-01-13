import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh-CN', 'ja', 'ko', 'es', 'fr', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The `pathnames` object holds the mapping of internal paths to their localized versions
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
