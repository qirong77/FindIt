import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import { createSettingWindow } from './createWindow'

export const createTray = (window: BrowserWindow) => {
  // 使用高分辨率图片,用@2x结尾
  const image = nativeImage.createFromPath(
    '/Users/qirong77/Documents/Code/projects/findIt/build/rocket-takeoff@2x.png'
  )
  // 自适应主题
  image.setTemplateImage(true)
  const tray = new Tray(image)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示搜索框 (Commend+F)',
      click: () => {
        window.show()
      }
    },
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
