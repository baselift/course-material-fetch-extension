import * as z from 'zod';
import type { DownloadMessage } from './types.ts';

const DownloadType = 'download';
export const DownloadMessageSchema = z.object({
  type: z.literal(DownloadType),
  url: z.string(),
});

export const createDownloadMessage = (url: DownloadMessage['url']) => ({
  type: DownloadType,
  url: url,
});

export const ExtensionMessageSchema = z.discriminatedUnion('type', [DownloadMessageSchema]);
