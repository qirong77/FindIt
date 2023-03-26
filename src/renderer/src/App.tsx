import React, { useEffect, useRef, useState } from 'react'
import { IFile } from 'src/common/types'
import { GET_SEARCH_RESULTS, GOOGLE, OPEN_FILE, SET_WINDOW_SIZE } from '../../common/const'
import { AppIcon, FileIcon, GoogleIcon, SearchIcon } from './icons'
let timer
export const App = () => {
  const [search, setSearch] = useState('')
  const [files, setFiles] = useState<IFile[]>([])
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (timer || status !== 0) return
    if (!search) {
      window.api.sendToMain(SET_WINDOW_SIZE, 50)
      setFiles([])
    } else {
      timer = window.setTimeout(() => {
        window.api.interProcess(GET_SEARCH_RESULTS, search).then((files) => {
          setFiles(files.slice(0, 3))
          setActive(0)
        })
        timer = null
      }, 120)
    }
  }, [search])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return (
    <div className="container min-w-sm">
      <div className="flex pl-[14px]  items-center h-[50px]  border-1 border-slate-400">
        {status === 0 ? <SearchIcon /> : <GoogleIcon />}
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="w-5/6 mx-4 pl-[4px] h-3/5 text-lg"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className="px-[10px] my-[6px]">
        {files.map((file, i) => (
          <li
            className={`flex items-center  ${i === active ? 'active-li' : ''}`}
            key={file.fileName}
          >
            {file.isApp ? <AppIcon /> : <FileIcon />}
            <span>{file.fileName}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.metaKey ? setActive(0) : setActive(active - 1 < 0 ? files.length - 1 : active - 1)
    }
    if (e.key === 'ArrowDown') {
      e.metaKey
        ? setActive(files.length - 1)
        : setActive(active + 1 > files.length - 1 ? 0 : active + 1)
    }
    if (e.key === 'Tab') {
      status === 0 ? setStatus(1) : setStatus(0)
      setFiles([])
      window.api.sendToMain(SET_WINDOW_SIZE, 50)
    }
    if (e.key === 'Enter') {
      if (status === 0 && search) {
        window.api.sendToMain(OPEN_FILE, {
          ...files[active],
          search
        })
      }
      if (status === 1) {
        window.api.sendToMain(GOOGLE, search)
      }
      setSearch('')
    }
  }
}
