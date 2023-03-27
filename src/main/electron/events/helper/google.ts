import { exec } from 'child_process'
import { getWindow } from './openFile'

export function google(e: Electron.IpcMainEvent, str = '') {
  exec(`open "https://www.google.com/search?q=${str}" -a "Google Chrome"`)
  getWindow(e)?.hide()
}
