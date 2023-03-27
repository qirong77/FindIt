import { FileType } from './types'
import { lstatSync } from 'fs'

export const getItemType = (filePath = ''): FileType => {
  if (/\.app/i.test(filePath)) return 'App'
  if (lstatSync(filePath).isDirectory()) return 'Folder'
  return 'File'
}
