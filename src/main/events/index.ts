import { W_WIDTH } from './../config/index';
import { ipcMain } from 'electron'
import { GET_SEARCH_RESULTS, GOOGLE, OPEN_FILE, SET_WINDOW_SIZE } from '../../common/const'
import { getPaths } from './helper/getPaths'
import { google } from './helper/google'
import { getWindow, openFile } from './helper/openFile'

export const onEvents = () => {
  ipcMain.handle(GET_SEARCH_RESULTS, (e, word) => getPaths(e, word))
  ipcMain.on(OPEN_FILE, (e, args) => openFile(e, args))
  ipcMain.on(GOOGLE, (e, args) => google(e, args))
  ipcMain.on(SET_WINDOW_SIZE, (e, args) => getWindow(e)?.setSize(W_WIDTH, args))
}
