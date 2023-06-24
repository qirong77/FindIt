import { app, BrowserWindow, Menu, Tray } from 'electron'
import { createSettingWindow } from './createWindow'

export const createTray = (window: BrowserWindow) => {
  const tray = new Tray('/Users/qirong77/Documents/Code/projects/findIt/build/rocket.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开设置',
      click: () => {
        createSettingWindow()
      }
    },
    {
      label: '退出App',
      click() {
        app.quit()
      }
    },
    {
      label: '重新加载查询数据',
      click() {
        console.log(window)
      }
    }
  ])
  tray.setToolTip('findIt')
  tray.setContextMenu(contextMenu)
  return tray
}
