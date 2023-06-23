import { fileIconToBuffer } from '../../../renderer/public/lib/file-icon/index'

export const ImageMap = new Map<string, string>()

export const getIconBuffers = (paths = ['/Applications/BaiduNetdisk_mac.app']) => {
  return fileIconToBuffer(paths, { size: 64 }).catch((error) => {
    console.log(error)
  }) as Promise<Buffer[]>
}
