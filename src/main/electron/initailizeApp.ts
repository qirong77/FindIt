import { globalShortcut, app } from 'electron'
import { onEvents } from './events'
import { createTray } from './helper/createTray'
import { createSettingWindow, createWindow } from './helper/createWindow'
import AutoLaunch from 'auto-launch'
let tray: any
export const initailizeApp = () => {
  // 开机重启,但是这里有些问题
  const autoLunch = new AutoLaunch({
    name: '',
    path: app.getAppPath()
  })
  autoLunch.isEnabled().then((isEnable) => {
    !isEnable && autoLunch.isEnabled
  })
  onEvents()
  const mainWindow = createWindow()
  // const mainWindow = createSettingWindow()
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
