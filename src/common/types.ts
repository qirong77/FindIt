export interface FindItFile {
  fileName: string
  filePath: string
  iconPath?: string
}

export interface IData {
  app: FindItFile
  level?: number
  files: FindItFile[]
  id: number
}

export interface SearchFile extends FindItFile {
  app: FindItFile
}
