import { useEffect, useState } from 'react'
import { GET_DATA, SAVE_DATA, SELECT_FILES } from '../../../common/const'
import { FindItFile, IData } from '../../../common/types'
import { AppIcon } from '../icons'

export const Settings = () => {
  const [datas, setDatas] = useState<IData[]>([])
  useEffect(() => {
    window.api.interProcess(GET_DATA).then((value) => {
      setDatas(JSON.parse(value))
    })
  }, [])
  useEffect(() => {
    window.api.interProcess(SAVE_DATA, JSON.stringify(datas)).then((newDatas) => {
      if (newDatas != JSON.stringify(datas)) {
        setDatas(JSON.parse(newDatas))
      }
    })
  }, [datas])
  return (
    <div className="w-[100vw] p-[20px]  flex flex-wrap justify-around ">
      {datas.map((data) => (
        <div
          className="w-[28%] h-[350px] flex flex-col justify-around border-2  border-slate-600 rounded my-[20px] "
          key={data.id}
        >
          <header className="h-[36px] flex items-center justify-start  bg-slate-50">
            {/* 后续这个用Select的方式 更易于理解*/}
            <span className="mx-[6px]">
              {data.app.iconPath ? (
                <img className="h-[25px]" src={'data:image/png;base64,' + data.app.iconPath} />
              ) : (
                <span></span>
              )}
            </span>
            {/* flex会影响文字溢出显示,所以要判断是否display:flex */}
            <span
              className="cursor-pointer w-[60%]  h-[28px] flex items-center"
              onClick={() => {
                window.api.interProcess(SELECT_FILES, 1).then((files) => {
                  const newDatas = deepCloneDatas()
                  const newData = newDatas.find((_d) => _d.id === data.id) as IData
                  newData.app = files[0] || []
                  setDatas(newDatas)
                })
              }}
            >
              {data.app?.fileName ? (
                <span>{data.app?.fileName?.replace('.app', '')}</span>
              ) : (
                <span>
                  <AppIcon />
                </span>
              )}
            </span>
            <span
              className="cursor-pointer ml-auto mr-[15px]"
              onClick={() => {
                const newDatas = deepCloneDatas()
                setDatas(newDatas.filter((d) => d.id !== data.id))
              }}
            >
              —
            </span>
          </header>
          <div className="flex-1 p-[10px] overflow-scroll text-slate-800">
            <ul>
              {data.files.map((f) => (
                <li className="flex pr-[20px] justify-start items-center" key={f.filePath}>
                  <span className="px-[6px]">
                    {f.iconPath && (
                      <img className="h-[16px]" src={'data:image/png;base64,' + f.iconPath} />
                    )}
                  </span>
                  <span className="w-[70%] h-[24px]">{f.fileName.replace('.app', '')}</span>
                  <span
                    className="cursor-pointer ml-auto"
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
            className="mx-auto cursor-pointer w-full flex justify-center items-center h-[50px] bg-slate-50"
            onClick={() => {
              window.api.interProcess(SELECT_FILES, 0).then((value: FindItFile[]) => {
                const newDatas = deepCloneDatas()
                const newData = newDatas.find((_d) => _d.id === data.id) as IData
                const preFils = newData.files.map((f) => f.filePath)
                value.forEach((newFile) => {
                  if (!preFils.includes(newFile.filePath)) newData.files.push(newFile)
                })
                setDatas(newDatas)
              })
            }}
          >
            <div className="text-center w-[80%] rounded border-dotted border-black  border-[2px] ">
              添加 +
            </div>
          </div>
        </div>
      ))}
      <div
        className="w-[28%] h-[350px] border-2  flex justify-center items-center border-slate-900 border-dotted rounded my-[20px] cursor-pointer "
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
        <span>添加卡片 + </span>
      </div>
    </div>
  )
  function deepCloneDatas() {
    return JSON.parse(JSON.stringify(datas)) as IData[]
  }
}
