import { exec } from 'child_process'
import { BrowserWindow } from 'electron'
import { FindItFile } from '../../../../common/types'
export const openFile = (e: Electron.IpcMainEvent, file: FindItFile) => {
  if (/\.app/.test(file.fileName)) {
    exec(`open ${file.filePath.replaceAll(' ', '\\ ')}`)
  } else {
    // 使用 "open" 命令打开文件夹
    const useFinder = `open ${file.filePath}`
    const useVsCode = `open -a "${
      file.type === 'mini-app' ? 'wechatwebdevtools' : 'Visual Studio Code'
    }" "${file.filePath}"`
    exec(file.type === 'finder' ? useFinder : useVsCode)
  }
  getWindow(e)?.hide()
}

export function getWindow(e: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent) {
  return BrowserWindow.getAllWindows().find((window) => {
    return window.id === e.sender.id
  })
}
