import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import { createSettingWindow } from './createWindow'
import path from 'path'
import { fileURLToPath } from 'url'

export const createTray = (window: BrowserWindow) => {
  const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
  const imagePath = path.join(__dirname, 'renderer', 'rocket-takeoff@2x.png')
  // 使用高分辨率图片,用@2x结尾
  const image = nativeImage.createFromPath(imagePath)
  // 自适应主题
  image.setTemplateImage(true)
  const tray = new Tray(image)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示搜索框  Commend+F',
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
    }
  ])
  tray.setToolTip('findIt')
  tray.setContextMenu(contextMenu)
  return tray
}
