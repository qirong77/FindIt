import { BrowserWindow } from 'electron'

export const getWindow = (e: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent) => {
  return BrowserWindow.getAllWindows().find((window) => {
    return window.id === e.sender.id
  })
}
