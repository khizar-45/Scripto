import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  windowControls: {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    restore: () => ipcRenderer.send('window-restore'),
    close: () => ipcRenderer.send('window-close'),
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Error exposing preload APIs:', error)
  }
} else {
  // @ts-ignore (define in env.d.ts)
  window.electron = electronAPI
  // @ts-ignore (define in env.d.ts)
  window.api = api
}
