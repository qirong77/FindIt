import React, { useEffect, useRef, useState } from 'react'
import { FindItFile } from 'src/common/types'
import { GET_ALL_FILES, OPEN_FILE, SET_WINDOW_SIZE } from '../../common/const'
import { AppIcon, FinderIcon, SearchIcon, VsCodeIcon } from './icons'
import debounce from 'debounce'
import pinyin from 'pinyin'
export const App = () => {
  const [allFiles, setAllFiles] = useState<FindItFile[]>([])
  const [files, setFiles] = useState<FindItFile[]>([])
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
        match: getMatchLevel(file.fileName, search)
      }))
      .sort((f1, f2) => f2.match - f1.match)
    setFiles(maths.slice(0, 6))
  }, 100)
  useEffect(() => {
    const getPaths = () =>
      window.api.interProcess(GET_ALL_FILES).then((files) => {
        setAllFiles(files)
      })
    window.api.onMain(GET_ALL_FILES, getPaths)
    getPaths()
  }, [])
  return (
    <div className="container min-w-sm">
      <div
        className={`flex pl-[20px] w-[100vw] items-center h-[50px] border-b-[1px] ${
          files.length ? 'border-slate-300' : 'border-transparent'
        } `}
      >
        <SearchIcon />
        <input
          ref={iptRef}
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="mx-4 pl-[4px] h-full text-xl outline-none"
          type="text"
        />
      </div>
      <ul className="px-[10px] my-[6px]">
        {files.map((file, i) => (
          <li
            className={`flex opacity-70  [&>svg]:mx-[6px] [&>svg]:w-[18px] [&>svg]:h-[18px] items-center  h-[30px] ${
              i === active ? 'active-li' : ''
            }`}
            key={file.filePath + file.type}
          >
            {file.type === 'app' ? (
              <AppIcon />
            ) : file.type === 'vscode' ? (
              <VsCodeIcon />
            ) : (
              <FinderIcon />
            )}
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
      search &&
        window.api.sendToMain(OPEN_FILE, {
          ...files[active],
          search
        })
    }
  }
}
function getMatchLevel(fileName = '', word = '') {
  fileName = normalizeStr(fileName)
  word = normalizeStr(word)
  if (fileName.includes(word)) return 100 - fileName.indexOf(word)
  const mcl = maxCommonLength(fileName, word)
  // 当没有匹配项的时候,返回最长公共子序列的长度
  return mcl
  function normalizeStr(str = '') {
    return pinyin(str, {
      style: 'normal'
    })
      .join('')
      .toLowerCase()
  }
  function maxCommonLength(str1 = '1234', str2 = '321') {
    if (!str1.length || !str2.length) return 0
    if (str1[0] === str2[0]) {
      return maxCommonLength(str1.slice(1), str2.slice(1)) + 1
    }
    const case1 = maxCommonLength(str1.slice(1), str2)
    const case2 = maxCommonLength(str1.slice(), str2.slice(1))
    return Math.max(case1, case2)
  }
}
