import { exec } from 'child_process'

import { BrowserWindow } from 'electron'
import { IFile } from '../../../common/types'
export const openFile = (e: Electron.IpcMainEvent, file: IFile) => {
  if (file.isApp) {
    exec(`open ${file.filePath.replaceAll(' ','\\ ')}`)
  } else {
    const appName = 'Visual Studio Code'
    // 使用 "open" 命令打开文件夹
    exec(`open -a "${appName}" "${file.filePath}"`, (error, _stdout, _stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`)
        return
      }
    })
  }
  getWindow(e)?.hide()
}

export function getWindow(e: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent) {
  return BrowserWindow.getAllWindows().find((window) => {
    return window.id === e.sender.id
  })
}
