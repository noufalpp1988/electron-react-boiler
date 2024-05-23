// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-channel-A';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    node_process() {
      return process.env;
    },
  },
};

const commonHandler = {
  getAuthToken: (arg: any) => ipcRenderer.invoke('channel-auth', arg),
  myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
  anAsyncFunction: async () => 123,
  data: {
    myFlags: ['a', 'b', 'c'],
    bootTime: 1234,
  },
  nestedAPI: {
    evenDeeper: {
      youCanDoThisAsMuchAsYouWant: {
        fn: () => ({
          returnData: 123,
        }),
      },
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

contextBridge.exposeInMainWorld('commonHandler', commonHandler);

export type ElectronHandler = typeof electronHandler;
export type CommonHandler = typeof commonHandler;
