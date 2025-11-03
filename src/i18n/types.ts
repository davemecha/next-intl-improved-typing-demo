import { routing } from '@/i18n/routing';
import messages from '@/messages/en.json';
import type {
  AppConfig,
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
  useTranslations,
} from 'next-intl';

/**
 * My custom type config for next-intl
 */
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

/**
 * Original translator type, inferred from useTranslations
 */
export type OriginalTranslator<Namespace extends AllNamespaces> = ReturnType<
  typeof useTranslations<Namespace>
>;

/**
 * Simplified branded translator type
 *
 * 1. it extends the original translator with namespace branding, to easily infer the namespace from the translator
 * 2. it adds a properly typed raw() method, to get autocomplete and type safety on the return type
 */
export type BrandedTranslator<Namespace extends AllNamespaces> = OmitPreserveCall<
  OriginalTranslator<Namespace>,
  'raw'
> & {
  raw: <S extends NestedKeys<Namespace>>(key: S) => NestedValue<BuildKey<Namespace, S>>;
  __namespace: Namespace;
};

type Messages = AppConfig['Messages'];

/**
 * Extracts the namespace from a branded translator
 */
export type ExtractNamespace<T> = T extends { __namespace: infer N }
  ? N extends keyof Messages
    ? N
    : never
  : never;

/**
 * Omit a property from a type, but preserve the call signature
 *
 * This general helper is used to preserve the call signature of the original translator
 */
export type OmitPreserveCall<T, K extends keyof T> = (T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : unknown) &
  Omit<T, K>;

/************************************************************************************
 * Simpler helper types to quickly access nested types based on the current config.
 *
 * I don't know, if there are better ways to do this, but this was a quick and convenient
 * way to access the nested types for me.
 ************************************************************************************/

export type AllKeys = NestedKeyOf<Messages>;
export type AllNamespaces = NamespaceKeys<Messages, AllKeys>;

export type NestedValue<Namespace extends AllKeys> = NestedValueOf<Messages, Namespace>;
export type NestedKeys<Namespace extends AllKeys> = NestedKeyOf<NestedValue<Namespace>>;
export type NestedNamespaceKeys<Namespace extends AllKeys> = NamespaceKeys<
  NestedValue<Namespace>,
  NestedKeys<Namespace>
>;
export type NestedMessageKeys<Namespace extends AllKeys> = MessageKeys<
  Messages,
  NestedKeys<Namespace>
>;

export type ChildKeySegments<Namespace extends AllKeys> = keyof NestedValue<Namespace>;

/**
 * This type is used to build a key from a namespace and a subkey.
 * It basically just concatenates the namespace and the subkey with a dot.
 */
export type BuildKey<
  Namespace extends AllNamespaces,
  SubKey extends NestedKeys<Namespace>,
> = Namespace extends AllNamespaces
  ? SubKey extends NestedKeys<Namespace>
    ? `${Namespace}.${SubKey}`
    : never
  : never;
