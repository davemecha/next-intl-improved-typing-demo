/**
 * Branded translator utility
 *
 * This module provides the createTypedTranslator function that adds type branding
 * and enhanced raw() typing to next-intl translators.
 */

import { AllNamespaces, BrandedTranslator, OriginalTranslator } from './types';

/**
 * Creates a typed translator from a next-intl translator instance.
 * This function enhances the translator with improved typing for the raw() method
 * while preserving all original translator methods (call signature, has, rich, markup, etc.).
 *
 * Note: This is only called for top-level namespaces. Sub-namespaces (e.g., 'portfolio.user')
 * are handled directly by next-intl without this branding layer.
 *
 * @param translator - The original translator from useTranslations or getTranslations
 * @param namespace - The namespace key (e.g., 'portfolio')
 * @returns Branded translator with enhanced typing
 *
 * @example
 * const t = useTranslations('portfolio');
 * const tTyped = createTypedTranslator(t, 'portfolio');
 *
 * // Now you get full autocomplete and type safety:
 * const profileObj = tTyped.raw('user.profile'); // Returns { heading: string, bio: string, settings: {...} }
 * const settingsObj = tTyped.raw('user.profile.settings'); // Returns { title: string, themeLabel: string, languageLabel: string }
 * const heading = tTyped.raw('user.profile.heading'); // Returns string
 */
export function createTypedTranslator<N extends AllNamespaces>(
  translator: OriginalTranslator<N>,
  namespace: N,
): BrandedTranslator<N> {
  return Object.assign(translator, {
    __namespace: namespace as N,
  }) as BrandedTranslator<N>;
}
