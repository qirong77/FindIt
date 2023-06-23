import fs from 'node:fs'
import { fileIconToBuffer } from 'file-icon'
import { basename } from 'node:path'

export const saveIcon = async (paths = ['/Applications/BaiduNetdisk_mac.app']) => {
  const buffers = (await fileIconToBuffer(paths.filter((p) => p.endsWith('.app')))) as Buffer[]
  return new Promise((resolve) => {
    buffers.forEach((buffer, index) => {
      fs.writeFileSync(basename(paths[index]) + '.png', buffer)
      if (index === buffers.length - 1) resolve('done')
    })
  })
}
