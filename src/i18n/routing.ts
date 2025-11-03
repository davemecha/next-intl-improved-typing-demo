import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Define the pathnames for your pages
  pathnames: {
    '/': '/',
  },
});

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation(routing);
