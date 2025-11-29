import type { COLORS } from './const.js';
import type { TupleToUnion } from 'type-fest';

type CompatibilityType = {
  background?:
    | {
        service_worker: string;
        scripts: string[]; // for firefox
        type?: 'module'; // If the service worker uses ES modules
      }
    | undefined;
};

export type * from 'type-fest';
export type ColorType = 'success' | 'info' | 'error' | 'warning' | keyof typeof COLORS;
export type ExcludeValuesFromBaseArrayType<B extends string[], E extends (string | number)[]> = Exclude<
  TupleToUnion<B>,
  TupleToUnion<E>
>[];

export type ManifestType = Omit<chrome.runtime.ManifestV3, keyof CompatibilityType> & CompatibilityType;
