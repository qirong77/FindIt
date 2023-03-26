import { readdirSync } from 'fs'
import { basename, join } from 'path'

import { IpcMainInvokeEvent } from 'electron'
import { getWindow } from './openFile'
import { pinyin } from 'pinyin'
import { IFile } from '../../../common/types'
const allPaths = getAllPaths()
export const getPaths = (e: IpcMainInvokeEvent, word = '') => {
  getWindow(e)?.setSize(600, 300)
  const paths: IFile[] = allPaths
    .map((filePath) => {
      const fileName = basename(filePath)
      return {
        fileName,
        filePath,
        isApp: /\.app/i.test(fileName),
        matchs: getMatchLevel(fileName, word)
      }
    })
    .sort((p1, p2) => p2.matchs - p1.matchs)
    .filter(isMatchPath)
  function getMatchLevel(fName = '', sWord = '') {
    fName = normalizeStr(fName)
    sWord = normalizeStr(sWord)
    const mcl = maxCommonLength(fName, sWord)
    // 当最长公共子序列长度相同的时候,需要让最前匹配到的在前面
    const include = fName.includes(word) ? fName.length - fName.indexOf(word) : 0
    return mcl + include
  }
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
// 获取所有的路径
function getAllPaths() {
  const targets = ['/Applications', '/Users/qirong77/Desktop/projects']
  const paths: string[] = []
  targets.forEach((dir) => {
    readdirSync(dir).forEach((fileName) => {
      const path = join(dir, fileName)
      paths.push(path)
    })
  })
  paths.push(
    '/System/Applications/Utilities/Terminal.app',
    '/Users/qirong77/Desktop/front-end-road/Markdowns'
  )
  return paths
}

function isMatchPath(iFile: IFile) {
  return /^[^\.].*$/.test(iFile.fileName)
}
