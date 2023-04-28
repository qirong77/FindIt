import { ipcMain } from 'electron'
import { GET_ALL_FILES, OPEN_FILE, SET_WINDOW_SIZE } from '../../../common/const'
import { getWindow, openFile } from './helper/openFile'
import { getAllPaths } from './helper/getAllPaths'

export const onEvents = () => {
  ipcMain.on(OPEN_FILE, (e, args) => openFile(e, args))
  ipcMain.on(SET_WINDOW_SIZE, (e, args) => getWindow(e)?.setSize(600, args))
  ipcMain.handle(GET_ALL_FILES, () => getAllPaths())
}
