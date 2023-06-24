import { fileIconToBuffer } from '../../../renderer/public/lib/file-icon/index'

export const ImageMap = new Map<string, string>()

export const getIconBuffers = (paths = ['/Applications/BaiduNetdisk_mac.app']) => {
  if (!paths[0]) return ''
  return fileIconToBuffer(paths, { size: 64 })
    .then((buffers) => (buffers[0] as any).toString('base64'))
    .catch((error) => {
      console.log(error)
    }) as Promise<string>
}
