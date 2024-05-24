/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  globalShortcut,
  session,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import serverStart from './server/server';

interface getCookieInterface {
  name: string;
  value: string;
  domain: string;
  hostOnly: boolean;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  session: boolean;
  expirationDate: number;
  sameSite: string;
}

interface setCookieInterface {
  url: string;
  name: string;
  value: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: string;
}
// server configuration
const startServer = () => {
  try {
    serverStart();
  } catch (err) {
    console.error('Server Error:', err);
  }
};

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const streamChannel = (channel: string, msg: string) => {
  ipcMain.on('ipc-channel-A', async (event, arg) => {
    const msgTemplate = (message: string) => message;
    console.log('msgTemplate:', msgTemplate(arg));
    event.reply(channel, msgTemplate(msg));
    // if (msgTemplate(arg).includes('reload')) {
    //   console.log('reloading');
    //   mainWindow?.reload();
    // }
  });
};

streamChannel('ipc-channel-A', 'Hello from main');

ipcMain.handle('channel-auth', async (event, arg) => {
  console.log('from Rndr:', arg);
  let cookiesArr: never[] = [];
  if (!arg.includes('logout')) {
    await session.defaultSession.cookies
      .get({ url: 'http://localhost:3001' })
      .then((cookies: any) => {
        console.log('found-cookies:3001:', cookies);
        cookiesArr = cookies;
      })
      .catch((error) => {
        console.log(error);
        cookiesArr = [];
      });
  } else {
    await session.defaultSession.cookies.remove('http://localhost:3001', 'jwt');
    cookiesArr = [];
  }
  console.log('cookiesArr-arg:', cookiesArr, arg);
  return cookiesArr;
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  (process.env.NODE_ENV === 'development' && process.env.DEBUG === 'true') ||
  process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.maximize();
      // mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    console.log('mainWindow closed');
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  globalShortcut.register('f5', function () {
    console.log('f5 is pressed');
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed

  console.log('app window closed');
  // quit the app when the browser is closed.
  // app.quit();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  mainWindow?.removeAllListeners('close');
  mainWindow?.close();
});

app.on('quit', () => {
  console.log('app quit');
});

// let devtools = null;

app
  .whenReady()
  .then(() => {
    createWindow();
    // start the node server for API
    startServer();

    // Query all cookies.
    session.defaultSession.cookies
      .get({})
      .then((cookies: any) => {
        console.log('main cookies:', cookies);
      })
      .catch((error) => {
        console.log(error);
      });

    const cookie1: setCookieInterface = {
      url: 'http://localhost:3001',
      name: 'testCookie',
      value: 'test',
      secure: true,
      httpOnly: false,
      sameSite: 'no_restriction',
    };

    session.defaultSession.cookies
      .set(cookie1)
      .then(
        () => {
          console.log('Cookie set:', cookie1.name);
        },
        (error) => {
          console.error(error);
        },
      )
      .catch((ex) => {
        console.error(ex);
      });

    // // To open the devtools by default
    // devtools = new BrowserWindow();
    // mainWindow?.webContents.setDevToolsWebContents(devtools.webContents);
    // mainWindow?.webContents.openDevTools({ mode: 'detach' });
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
