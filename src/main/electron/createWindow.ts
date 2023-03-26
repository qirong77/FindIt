import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import path from 'path'

export function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 150,
    show: true,
    type: 'toolbar',
    autoHideMenuBar: true,
    frame: false,
    opacity: 0.86,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {})
  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}
