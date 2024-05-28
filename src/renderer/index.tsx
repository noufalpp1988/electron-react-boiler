import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

(async () => {
  // calling IPC exposed from preload script
  await window.electron.ipcRenderer.once('ipc-channel-A', (arg) => {
    // eslint-disable-next-line no-console
    console.log('IPC msg:', arg);
  });
  await window.electron.ipcRenderer.sendMessage('ipc-channel-A', [
    'ping from render',
  ]);
  console.log(
    'Node_Process :',
    await window.electron.ipcRenderer.node_process(),
  );

  const response = await window.commonHandler.getCookie([]);
  console.log('IPC:commonHandler :', response);
})();
