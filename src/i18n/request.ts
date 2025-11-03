import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    // This part is not strictly necessary as the middleware should redirect
    // to a supported locale.
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
