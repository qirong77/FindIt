import { useEffect, useState } from 'react'
import { GET_DATA, SAVE_DATA, SELECT_FILES } from '../../../common/const'
import { FindItFile } from '../../../common/types'
interface IData {
  app: FindItFile
  level?: number
  files: FindItFile[]
  id: number
}
export const Settings = () => {
  const [datas, setDatas] = useState<IData[]>([])
  useEffect(() => {
    window.api.interProcess(GET_DATA).then((value) => {
      setDatas(JSON.parse(value))
    })
  }, [])
  useEffect(() => {
    window.api.interProcess(SAVE_DATA, JSON.stringify(datas))
  }, [datas])
  return (
    <div className="w-[100vw] h-[100vh] p-[30px] flex flex-wrap justify-start">
      {datas.map((data) => (
        <div className="w-[30%] p-[30px]" key={data.id}>
          <header className="flex justify-between">
            {/* 后续这个用Select的方式 更易于理解*/}
            <span
              onClick={() => {
                window.api.interProcess(SELECT_FILES).then((files) => {
                  const newDatas = deepCloneDatas()
                  const newData = newDatas.find((_d) => _d.id === data.id) as IData
                  newData.app = files[0] || []
                  setDatas(newDatas)
                })
              }}
            >
              {data.app?.fileName?.replace('.app', '') || '快速打开'}
            </span>
            <span
              onClick={() => {
                const newDatas = deepCloneDatas()
                setDatas(newDatas.filter((d) => d.id !== data.id))
              }}
            >
              -
            </span>
          </header>
          <div>
            <ul>
              {data.files.map((f) => (
                <li className="flex justify-between" key={f.filePath}>
                  <span className="w-[70%] overflow-hidden text-ellipsis">
                    {f.fileName.replace('.app', '')}
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      const newDatas = deepCloneDatas()
                      const newData = newDatas.find((_d) => _d.id === data.id) as IData
                      newData.files = newData?.files.filter(
                        ({ filePath }) => filePath !== f.filePath
                      )
                      setDatas(newDatas)
                    }}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="text-center cursor-pointer rounded border-dotted border-black border-[2px]"
            onClick={() => {
              window.api.interProcess(SELECT_FILES).then((value: FindItFile[]) => {
                const newDatas = deepCloneDatas()
                const newData = newDatas.find((_d) => _d.id === data.id)
                newData!.files = value
                setDatas(newDatas)
              })
            }}
          >
            添加 +
          </div>
        </div>
      ))}
      <div
        onClick={() =>
          setDatas([
            ...deepCloneDatas(),
            {
              app: {
                fileName: '',
                filePath: ''
              },
              level: 0,
              files: [],
              id: new Date().getTime()
            }
          ])
        }
      >
        添加卡片
      </div>
    </div>
  )
  function deepCloneDatas() {
    return JSON.parse(JSON.stringify(datas)) as IData[]
  }
}
