export type FileType = 'App' | 'Folder' | 'File'
export interface IFile {
  fileName: string
  filePath: string
  type: FileType
  matchs: number
}
