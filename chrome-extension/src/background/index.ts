import 'webextension-polyfill';
import { ExtensionMessageSchema } from '@extension/shared';

chrome.runtime.onMessage.addListener(async (msg, sender) => {
  const parsedMsg = ExtensionMessageSchema.safeParse(msg);
  if (parsedMsg.success && sender?.id === chrome.runtime.id) {
    const msg = parsedMsg.data;
    const type = msg.type;
    switch (type) {
      case 'download': {
        await new Promise<void>(resolve => {
          chrome.downloads.onChanged.addListener(function revokeAfterCompletion(delta) {
            const state = delta.state;
            if (state && state.current === 'complete') {
              chrome.downloads.onChanged.removeListener(revokeAfterCompletion);
              resolve();
            }
          });
          chrome.downloads.download({ url: msg.url, filename: 'data.zip', saveAs: false });
        });
      }
    }
  } else {
    console.log('Message is not in the correct form.');
  }
});
