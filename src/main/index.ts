import { onEvents } from './events/index'
import { app, BrowserWindow, globalShortcut, Menu, Tray } from 'electron'

import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './electron/createWindow'
let tray
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  const mainWindow = createWindow()
  onEvents()
  const tray = new Tray('/Users/qirong77/Desktop/findIt/build/umbrellaTemplate.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', checked: true },
    {
      label: '退出App',
      click() {
        console.log('1')
      }
    }
  ])
  tray.setToolTip('findIt')
  tray.setContextMenu(contextMenu)
  globalShortcut.register('Alt+Space', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  globalShortcut.register('Esc', () => {
    mainWindow.hide()
  })
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  mainWindow.setAlwaysOnTop(true, 'floating', 1)
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
