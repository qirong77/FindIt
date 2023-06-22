import { useEffect, useState } from 'react'
import { SELECT_FILES } from '../../../common/const'
import { FindItFile } from '../../../common/types'

export const Settings = () => {
  return (
    <div className="w-[100vw] h-[100vh] p-[30px] flex flex-wrap justify-start">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

function Card() {
  const [app, setApp] = useState<FindItFile>()
  const [files, setFiles] = useState<{ fileName: string; filePath: string }[]>([])
  useEffect(() => {
    console.log(files)
  }, [files])
  return (
    <div className="w-[30%] p-[30px]">
      <header className="flex justify-between">
        {/* 后续这个用Select的方式 更易于理解*/}
        <span
          onClick={() => {
            window.api.interProcess(SELECT_FILES).then((value: FindItFile) => setApp(value))
          }}
        >
          {app?.fileName || '快速打开'}
        </span>
        <span>w:10</span>
      </header>
      <div>
        <ul>
          {files.map((f) => (
            <li className="flex justify-between" key={f.filePath}>
              <span>{f.fileName}</span>
              <span
                className="cursor-pointer"
                onClick={() =>
                  setFiles(
                    files.filter(({ filePath }) => {
                      return filePath !== f.filePath
                    })
                  )
                }
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="text-center cursor-pointer rounded border-dotted border-black border-[2px]"
        onClick={() =>
          window.api.interProcess(SELECT_FILES).then((value) => {
            setFiles([...files, ...value])
          })
        }
      >
        添加+
      </div>
    </div>
  )
}
