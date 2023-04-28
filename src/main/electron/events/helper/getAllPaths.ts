import { readdirSync } from 'fs'
import { basename, join } from 'path'
import { FindItFile } from '../../../../common/types'
// 获取所有的路径
export function getAllPaths() {
  const paths: FindItFile[] = []
  const appPaths = [...getDirFiles('/Applications'), '/System/Applications/Utilities/Terminal.app']
  const vscodePaths = [
    ...getDirFiles('/Users/qirong77/Desktop/projects'),
    '/Users/qirong77/.zshrc',
    '/Users/qirong77/Desktop/front-end-road/Markdowns'
  ]
  const finderPaths = [...vscodePaths]
  appPaths.forEach((p) => {
    paths.push({
      fileName: basename(p),
      filePath: p,
      type: 'app'
    })
  })
  vscodePaths.forEach((p) => {
    paths.push({
      fileName: basename(p),
      filePath: p,
      type: 'vscode'
    })
  })
  finderPaths.forEach((p) => {
    paths.push({
      fileName: basename(p),
      filePath: p,
      type: 'finder'
    })
  })
  return paths
}

function getDirFiles(dir = '') {
  const paths: string[] = []
  readdirSync(dir).forEach((fileName) => {
    if (/^[\.].*$/.test(fileName)) return
    const path = join(dir, fileName)
    paths.push(path)
  })
  return paths
}

