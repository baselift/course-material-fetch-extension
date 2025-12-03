import type { COLORS } from './const.js';
import type { DownloadMessageSchema, ExtensionMessageSchema } from './schemas.js';
import type Dataform from '../dataforms/Dataform.js';
import type { TupleToUnion } from 'type-fest';
import type { infer as Infer } from 'zod';

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

export interface Course {
  courseName: string;
  courseId: number;
}

export interface Item {
  id: number;
  type: Dataform;
}

export type ExtensionMessage = Infer<typeof ExtensionMessageSchema>;
export type DownloadMessage = Infer<typeof DownloadMessageSchema>;

export type Nullable<T> = null | T;
