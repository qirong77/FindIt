import { getItemType } from '../../../../common/getItemType'

import { basename } from 'path'
import { IpcMainInvokeEvent } from 'electron'
import { getWindow } from './openFile'
import { pinyin } from 'pinyin'
import { IFile } from '../../../../common/types'
import { getStorePaths } from '../../store'
export const getPaths = (e: IpcMainInvokeEvent, word = '') => {
  getWindow(e)?.setSize(600, 300)
  const allPaths = getStorePaths()
  const paths: IFile[] = allPaths
    .map((filePath) => {
      const fileName = basename(filePath)
      return {
        fileName,
        filePath,
        type: getItemType(filePath),
        matchs: getMatchLevel(fileName, word)
      }
    })
    .sort((p1, p2) => p2.matchs - p1.matchs)

  return paths
}
function getMatchLevel(fileName = '', word = '') {
  fileName = normalizeStr(fileName)
  word = normalizeStr(word)
  if (fileName.includes(word)) return 100 - fileName.indexOf(word)
  const mcl = maxCommonLength(fileName, word)
  // 当没有匹配项的时候,返回最长公共子序列的长度
  return mcl
  function normalizeStr(str = '') {
    return pinyin(str, {
      style: 'normal'
    })
      .join('')
      .toLowerCase()
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
}

