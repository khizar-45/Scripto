/* eslint-disable @typescript-eslint/no-require-imports */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import 'electron-reloader';

if (is.dev) {
  try {
    require('electron-reloader')(module)
  } catch (err) {
    console.log('Error loading electron-reloader:', err)
  }
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    autoHideMenuBar: true,
    frame : false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  
  mainWindow.maximize();
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('ready-to-show', () => {
    mainWindow.show(),
    mainWindow.center();
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('window-minimize', () => mainWindow?.minimize())
  ipcMain.on('window-maximize', () => mainWindow?.maximize())
  ipcMain.on('window-restore', () => mainWindow?.restore())
  ipcMain.on('window-close', () => mainWindow?.close())
  ipcMain.on("check-maximized", (event) => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;
    if (win.isMaximized()) event.sender.send("window-maximized");
    else event.sender.send("window-unmaximized");
  });

}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window))

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
