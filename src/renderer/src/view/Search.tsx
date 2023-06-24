import React, { useEffect, useRef, useState } from 'react'

import { GET_DATA, OPEN_FILE, SET_WINDOW_SIZE } from '../../../common/const'
import { SearchIcon } from '.././icons'
import debounce from 'debounce'
import pinyin from 'pinyin'
import { IData, SearchFile } from '../../../common/types'
export const Search = () => {
  const [allFiles, setAllFiles] = useState<SearchFile[]>([])
  const [files, setFiles] = useState<SearchFile[]>([])
  const [active, setActive] = useState(0)
  const iptRef = useRef<HTMLInputElement>(null)
  const handleChange = debounce((e) => {
    setActive(0)
    const search = e.target.value as string
    window.api.sendToMain(SET_WINDOW_SIZE, search ? 240 : 50)
    if (!search) {
      setFiles([])
      return
    }
    const maths = allFiles
      .map((file) => ({
        ...file,
        match: getMatchLevel(file, search)
      }))
      .sort((f1, f2) => f2.match - f1.match)
    setFiles(maths.slice(0, 6))
  }, 100)
  useEffect(() => {
    window.api.interProcess(GET_DATA).then((value) => {
      const datas: IData[] = JSON.parse(value)
      const _files = datas.reduce((pre, data) => {
        data.files.forEach((file) => {
          pre.push({
            ...file,
            app: data.app
          })
        })
        return pre
      }, [] as SearchFile[])
      setAllFiles(_files)
    })
  }, [])
  return (
    <div className="container min-w-sm">
      <div
        className={`relative flex pl-[20px] w-[100vw] items-center h-[50px] border-b-[1px] ${
          files.length ? 'border-slate-300' : 'border-transparent'
        } `}
      >
        <SearchIcon />
        <input
          ref={iptRef}
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="mx-4 pl-[4px] h-full text-xl outline-none flex-1"
          type="text"
        />
        <span className="mx-[20px]">
          {files[active]?.app.iconPath && (
            <img className="h-[30px]" src={'data:image/png;base64,' + files[active].app.iconPath} />
          )}
        </span>
      </div>
      <ul className="px-[10px] my-[6px]">
        {files.map((file, i) => (
          <li
            className={`flex opacity-70  [&>svg]:mx-[6px] [&>svg]:w-[18px] [&>svg]:h-[18px] items-center  h-[30px] ${
              i === active ? 'active-li' : ''
            }`}
            key={file.filePath + i}
          >
            <span className="mx-[6px]">
              {file.iconPath && (
                <img className="h-[20px]" src={'data:image/png;base64,' + file.iconPath} />
              )}
            </span>
            <span>{file.fileName.replace('.app', '')}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      e.metaKey ? setActive(0) : setActive(active - 1 < 0 ? files.length - 1 : active - 1)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      e.metaKey
        ? setActive(files.length - 1)
        : setActive(active + 1 > files.length - 1 ? 0 : active + 1)
    }
    if (e.key === 'Enter') {
      const search = iptRef.current?.value
      if (search) {
        window.api.sendToMain(OPEN_FILE, files[active])
        window.api.sendToMain(SET_WINDOW_SIZE, 50)
        setFiles([])
      }
      iptRef.current!.value = ''
    }
  }
}
function getMatchLevel(file: SearchFile, word = '') {
  let fileName = normalizeStr(file.fileName)
  word = normalizeStr(word)
  if (fileName.includes(word)) return 100 - fileName.indexOf(word)
  // 没有找到,返回-1
  return -1
}
function normalizeStr(str = '') {
  return pinyin(str, {
    style: 'normal'
  })
    .join('')
    .toLowerCase()
}
