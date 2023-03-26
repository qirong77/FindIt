import { createTray } from './electron/createTray';
import { onEvents } from './events/index'
import { app, BrowserWindow, globalShortcut, } from 'electron'

import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './electron/createWindow'
let tray
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  const mainWindow = createWindow()
  onEvents()
  tray = createTray()
  // 打开选择文件对话框
  // dialog
  //   .showOpenDialog({
  //     properties: ['openFile'] // 指定只能选择文件，而不是目录
  //   })
  //   .then((result) => {
  //     // result.canceled 表示用户是否取消了选择
  //     // result.filePaths 是一个数组，包含用户选择的文件路径
  //     console.log(result.canceled)
  //     console.log(result.filePaths)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  globalShortcut.register('Alt+Space', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  globalShortcut.register('Esc', () => {
    mainWindow.hide()
  })
  // 在全屏模式可见,会隐藏左上角的菜单栏
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
