import 'webextension-polyfill';
import { createMessage, DownloadProgressType, DownloadType, ExtensionMessageSchema } from '@extension/shared';

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(async msg => {
    const parsedMsg = ExtensionMessageSchema.safeParse(msg);
    if (parsedMsg.success && port.sender?.id === chrome.runtime.id) {
      const msg = parsedMsg.data;
      const type = msg.type;
      switch (type) {
        case DownloadType: {
          let intervalId: NodeJS.Timeout | undefined;
          chrome.downloads.onChanged.addListener(delta => {
            if (delta.state?.current === 'complete' || delta.state?.current === 'interrupted') {
              clearInterval(intervalId);
              port.disconnect();
            }
          });
          chrome.downloads.onCreated.addListener(item => {
            intervalId = setInterval(() => {
              chrome.downloads.search({ id: item.id }, items => {
                const item = items[0];
                port.postMessage(
                  createMessage({
                    type: DownloadProgressType,
                    progress: item.totalBytes > 0 ? item.bytesReceived / item.totalBytes : -1,
                  }),
                );
              });
            }, 100);
          });
          chrome.downloads.download({ url: msg.url, filename: 'data.zip', saveAs: false });
        }
      }
    } else {
      console.log('Message is not in the correct form.');
    }
  });
});
