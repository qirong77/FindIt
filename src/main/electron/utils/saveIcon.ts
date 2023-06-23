import fs from 'node:fs'

import path, { basename } from 'node:path'
import { fileIconToBuffer } from '../../../renderer/public/lib/file-icon/index'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
export const ImageMap = new Map<string, string>()
export const saveIcon = (paths = ['/Applications/BaiduNetdisk_mac.app']) => {
  return fileIconToBuffer([...new Set(paths.filter((p) => p.endsWith('.app')))], { size: 64 })
    .then((buffers) => {
      buffers.forEach((buffer, index) => {
        const filePath = paths[index]
        const imgPath = getSavePath(filePath)
        if (ImageMap.has(filePath)) return
        fs.writeFileSync(imgPath, buffer)
        ImageMap.set(filePath, imgPath)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export function getSavePath(filePath = '') {
  const base = basename(filePath) + '.png'
  const imgPath = path.join(__dirname, 'renderer', 'images', base)
  return imgPath
}
