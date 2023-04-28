import { app, BrowserWindow, Menu, Tray } from 'electron'
import { GET_ALL_FILES } from '../../../common/const'

export const createTray = (window: BrowserWindow) => {
  const tray = new Tray('/Users/qirong77/Desktop/projects/findIt/build/umbrellaTemplate.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开设置', type: 'radio', checked: true },
    {
      label: '退出App',
      click() {
        app.quit()
      }
    },
    {
      label: '重新加载查询数据',
      click() {
        window.webContents.send(GET_ALL_FILES)
      }
    }
  ])
  tray.setToolTip('findIt')
  tray.setContextMenu(contextMenu)
  return tray
}
