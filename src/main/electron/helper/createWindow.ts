import { is } from '@electron-toolkit/utils'
import { BrowserWindow, ipcMain, shell } from 'electron'
import path from 'path'
import { CHANGE_VIEW } from '../../../common/const'

export function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 50,
    show: true,
    type: 'toolbar',
    autoHideMenuBar: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send(CHANGE_VIEW, '搜索')
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

export function createSettingWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: '设置',
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send(CHANGE_VIEW, '设置')
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // // 等渲染进程加载好之后再继续,这个应该使用路由来进行优化
  // setTimeout(() => {
  //   mainWindow.webContents.send(CHANGE_VIEW)
  // }, 500)
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}
