import { readdirSync } from 'fs'
import { join } from 'path'

export const W_WIDTH = 650




// 获取所有的路径
export function getAllPaths() {
  const targets = ['/Applications', '/Users/qirong77/Desktop/projects']
  const paths: string[] = []
  targets.forEach((dir) => {
    readdirSync(dir).forEach((fileName) => {
      if (/^[\.].*$/.test(fileName)) return
      const path = join(dir, fileName)
      paths.push(path)
    })
  })
  paths.push(
    '/System/Applications/Utilities/Terminal.app',
    '/Users/qirong77/Desktop/front-end-road/Markdowns',
    '/Users/qirong77/.zshrc',
  )
  return paths
}
