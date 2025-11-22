import type Dataform from './dataforms/Dataform.js';

export const QUERCUS_BASE_URL = 'https://q.utoronto.ca';
export const QUERCUS_BASE_API_ENDPOINT = `${QUERCUS_BASE_URL}/api/v1`;

export interface Course {
  courseName: string;
  courseId: number;
}

export interface Item {
  id: number;
  type: Dataform;
}

export type Nullable<T> = null | T;
