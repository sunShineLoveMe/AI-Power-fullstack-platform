// src/types/coze.d.ts
declare module 'CozeWebSDK' {
    export class WebChatClient {
      constructor(options: {
        config: {
          bot_id: string;
        };
        componentProps: {
          title: string;
        };
      });
    }
  }