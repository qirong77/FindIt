
import { readdirSync, } from 'fs'
import { basename, join } from 'path'

import { IpcMainInvokeEvent } from 'electron'
import { getWindow } from './openFile'
import { pinyin } from 'pinyin'
import { IFile } from '../../../common/types'
const allPaths = getAllPaths()
export const getPaths = (e: IpcMainInvokeEvent, word = '') => {
  getWindow(e)?.setSize(600, 500)
  const paths: IFile[] = allPaths
    .map(filePath => {
      const fileName = basename(filePath)
      const matchs = maxCommonLength(normalizeStr(fileName), normalizeStr(word))
      return {
        fileName,
        filePath,
        isApp: /\.app/i.test(fileName),
        matchs: normalizeStr(fileName).includes(normalizeStr(word)) ? 1 + matchs: matchs
      }
    })
    .sort((p1, p2) => p2.matchs - p1.matchs)
    .filter(isMatchPath)
  return paths
}

function maxCommonLength(str1 = '1234', str2 = '321') {
  if (!str1.length || !str2.length) return 0
  if (str1[0] === str2[0]) {
    return maxCommonLength(str1.slice(1), str2.slice(1)) + 1
  }
  const case1 = maxCommonLength(str1.slice(1), str2)
  const case2 = maxCommonLength(str1.slice(), str2.slice(1))
  return Math.max(case1, case2)
}

function normalizeStr(str = '') {
  return pinyin(str, {
    style: 'normal'
  })
    .join('')
    .toLowerCase()
}

function getAllPaths() {
  const targets = [
    '/System/Applications/Utilities',
    '/Applications',
    '/Users/qirong77/Desktop/projects'
  ]
  const paths: string[] = []
  targets.forEach(dir => {
    readdirSync(dir).forEach(fileName => {
      const path = join(dir, fileName)
      paths.push(path)
    })
  })
  return paths
}

function isMatchPath(iFile: IFile) {
  return /^[^\.].*$/.test(iFile.fileName) && iFile.matchs >= 2
}
