export interface FindItFile {
  fileName: string
  filePath: string
}

export interface IData {
  app: FindItFile
  level?: number
  files: FindItFile[]
  id: number
}
