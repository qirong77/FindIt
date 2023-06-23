import path from 'path'
import { fileURLToPath } from 'url'

// main/render
export const OPEN_FILE = 'open file'
export const SET_WINDOW_SIZE = 'set window size'
export const GET_ALL_FILES = 'get all files'
export const CHANGE_VIEW = 'change view'
export const SELECT_FILES = 'select files'
export const SAVE_DATA = 'save data'
export const GET_DATA = 'get data'

// 修复第三方库的可执行文件无法正常引入的问题
// 打包的出口,(对于主进程来说)
export const OUT_PATH = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
export const OUT_IMAGE_PATH = path.join(OUT_PATH, 'renderer', 'images')
