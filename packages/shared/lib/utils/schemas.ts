import * as z from 'zod';

const TypeKey = 'type';
type TypeKey = typeof TypeKey;

export const DownloadType = 'download';
export const DownloadProgressType = 'progress';

export const DownloadMessageSchema = z.object({
  type: z.literal(DownloadType),
  url: z.string(),
});
export const DownloadProgressSchema = z.object({
  type: z.literal(DownloadProgressType),
  progress: z.number(),
});
export const ExtensionMessageSchema = z.discriminatedUnion(TypeKey, [DownloadMessageSchema, DownloadProgressSchema]);
export type ExtensionMessage = z.Infer<typeof ExtensionMessageSchema>;

export const createMessage = <M extends ExtensionMessage>({ type, ...info }: M) => ({
  type: type,
  ...info,
});
