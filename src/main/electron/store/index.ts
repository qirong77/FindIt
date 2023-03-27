import Store from 'electron-store'
import { FIND_IT_PATHS } from '../../../common/const'
import { getAllPaths } from '../../config'
const store = new Store<{
  [FIND_IT_PATHS]: string,
}>()
if (!store.get(FIND_IT_PATHS)?.length) {
  updateStorePaths()
}
export function updateStorePaths() {
  store.set(FIND_IT_PATHS, JSON.stringify(getAllPaths()))
}
export function getStorePaths() {
  return JSON.parse(store.get(FIND_IT_PATHS)) || []
}
