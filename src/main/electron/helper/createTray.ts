import { app, Menu, Tray } from 'electron'

export const createTray = () => {
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
      }
    }
  ])
  tray.setToolTip('findIt')
  tray.setContextMenu(contextMenu)
  return tray
}
