import { useEffect, useState } from 'react'
import { Settings } from './view/Settings'
import { Search } from './view/Search'
import { CHANGE_VIEW } from '../../renderer/../common/const'

export const App = () => {
  const [view, setView] = useState('')
  useEffect(() => {
    window.api.onMain(CHANGE_VIEW, (_e, arg) => {
      setView(arg)
    })
  }, [])
  return (
    <div>
      {view === '设置' && <Settings />}
      {view === '搜索' && <Search />}
    </div>
  )
}
