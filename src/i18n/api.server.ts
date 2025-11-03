import { createTypedTranslator } from '@/i18n/createTypedTranslator';
import { routing } from '@/i18n/routing';
import { getTranslations as getTranslationsOriginal } from 'next-intl/server';
import type { AllNamespaces, BrandedTranslator } from './types';

type Locale = (typeof routing.locales)[number];

/**
 * Wraps the original getTranslations hook from next-intl with a branded translator.
 *
 * @param namespace - The namespace to use
 * @returns A branded translator for the given namespace with improved typing
 */
export async function getTranslations<N extends AllNamespaces>(
  namespace: N,
): Promise<BrandedTranslator<N>>;
export async function getTranslations<N extends AllNamespaces>({
  namespace,
  locale,
}: {
  namespace: N;
  locale: Locale;
}): Promise<BrandedTranslator<N>>;
export async function getTranslations<N extends AllNamespaces>(
  options:
    | {
        namespace: N;
        locale?: Locale;
      }
    | N,
): Promise<BrandedTranslator<N>> {
  const { namespace, locale } = typeof options === 'string' ? { namespace: options as N } : options;
  const translator = locale
    ? await getTranslationsOriginal({ locale, namespace })
    : await getTranslationsOriginal(namespace);

  return createTypedTranslator(translator, namespace);
}
