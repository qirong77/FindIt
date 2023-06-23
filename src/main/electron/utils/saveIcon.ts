import fs from 'node:fs'

import path, { basename } from 'node:path'
import { fileIconToBuffer } from '../../../renderer/public/lib/file-icon/index'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

export const saveIcon = (paths = ['/Applications/BaiduNetdisk_mac.app']) => {
  return fileIconToBuffer(
    paths.filter((p) => p.endsWith('.app')),
    {}
  )
    .then((buffers) => {
      buffers.forEach((buffer, index) => {
        const base = basename(paths[index]) + '.png'
        fs.writeFileSync(path.join(__dirname, 'renderer', 'images', base), buffer)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
