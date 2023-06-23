import { dialog, ipcMain } from 'electron'
import {
  GET_ALL_FILES,
  GET_DATA,
  OPEN_FILE,
  SAVE_DATA,
  SELECT_FILES,
  SET_WINDOW_SIZE
} from '../../../common/const'
import { openFile } from './helper/openFile'
import { getAllPaths } from './helper/getAllPaths'
import { basename } from 'path'
import { getWindow } from '../utils/getWindow'
import Store from 'electron-store'
import { saveIcon } from '../utils/saveIcon'
const store = new Store()
const DATE_KEY = 'find it data'
export const onEvents = () => {
  ipcMain.on(OPEN_FILE, openFile)
  ipcMain.on(SET_WINDOW_SIZE, (e, args) => getWindow(e)?.setSize(600, args))
  ipcMain.handle(GET_ALL_FILES, getAllPaths)
  ipcMain.handle(SELECT_FILES, async (e) => {
    const window = getWindow(e)
    if (!window) return []
    const { filePaths } = await dialog.showOpenDialog(window, {
      properties: ['multiSelections', 'openFile', 'openDirectory']
    })
    return filePaths.map((file) => ({
      fileName: basename(file),
      filePath: file
    }))
  })
  ipcMain.handle(SAVE_DATA, (_e, data) => {
    saveIcon()
    store.set(DATE_KEY, data)
    return store.get(DATE_KEY) || []
  })
  ipcMain.handle(GET_DATA, () => store.get(DATE_KEY) || [])
}
