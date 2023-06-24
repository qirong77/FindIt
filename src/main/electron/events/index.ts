import { dialog, ipcMain } from 'electron'
import {
  GET_ALL_FILES,
  GET_DATA,
  OPEN_FILE,
  SAVE_DATA,
  SELECT_FILES,
  SET_WINDOW_SIZE,
  TOOGLE_DEVTOOL
} from '../../../common/const'
import { openFile } from './helper/openFile'
import { getAllPaths } from './helper/getAllPaths'
import { basename } from 'path'
import { getWindow } from '../utils/getWindow'
import Store from 'electron-store'
import { IData } from '../../../common/types'
import { getIconBuffers } from '../utils/getIconBuffers'
const store = new Store()
const DATE_KEY = 'find it data'
export const onEvents = () => {
  ipcMain.on(OPEN_FILE, openFile)
  ipcMain.on(SET_WINDOW_SIZE, (e, args) => getWindow(e)?.setSize(600, args))
  ipcMain.on(TOOGLE_DEVTOOL, (e) => {
    getWindow(e)?.webContents.openDevTools()
  })
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
  ipcMain.handle(SAVE_DATA, async (_e, datas: string) => {
    const _datas = JSON.parse(datas) as IData[]
    for (let i = 0; i < _datas.length; i++) {
      const data = _datas[i]
      data.app.iconPath = await getIconBuffers([data.app.filePath])
      console.log(data.app.iconPath)
      // 给每个file赋值icon
      // for (let j = 0; j < _datas[i].files.length - 1; j++) {
      //   const file = _datas[i].files[i]
      //   if (file.filePath) {
      //     const [iconBuffer]: Buffer[] = await getIconBuffers([_datas[i].app.filePath])
      //     file.iconPath = iconBuffer.toString('base64')
      //     console.log(file.iconPath)
      //   }
      // }
    }
    store.set(DATE_KEY, JSON.stringify(_datas))
    return store.get(DATE_KEY) || []
    // return store.get(DATE_KEY) || []
  })
  ipcMain.handle(GET_DATA, () => store.get(DATE_KEY) || [])
}
