import { globalShortcut } from 'electron'
import { onEvents } from './events'
import { createTray } from './helper/createTray'
import { createWindow } from './helper/createWindow'
let tray
export const initailizeApp = () => {
  onEvents()
  const mainWindow = createWindow()
  // 在全屏模式可见,会隐藏左上角的菜单栏
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  mainWindow.setAlwaysOnTop(true, 'floating', 1)
  mainWindow.on('blur', mainWindow.hide)
  tray = createTray(mainWindow)
  globalShortcut.register('Alt+Space', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  globalShortcut.register('Esc', () => {
    mainWindow.hide()
  })
}

