import { createTypedTranslator } from '@/i18n/createTypedTranslator';
import { useTranslations as useTranslationsOriginal } from 'next-intl';
import type { AllNamespaces, BrandedTranslator } from './types';

/**
 * Wraps the original useTranslations hook from next-intl with a branded translator.
 *
 * @param namespace - The namespace to use
 * @returns A branded translator for the given namespace with improved typing
 */
export function useTranslations<N extends AllNamespaces>(namespace: N): BrandedTranslator<N> {
  const translator = useTranslationsOriginal(namespace);
  return createTypedTranslator(translator, namespace);
}
