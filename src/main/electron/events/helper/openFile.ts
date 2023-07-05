import { exec } from 'child_process'
import { getWindow } from '../../utils/getWindow'
import { dialog } from 'electron'
import { SearchFile } from '../../../../common/types'
export const openFile = (e: Electron.IpcMainEvent, file: SearchFile) => {
  if (file.app.filePath.includes('Visual Studio Code')) {
    openFileWithVSCode(file.filePath)
    getWindow(e)?.hide()
    return
  }
  let command = ''
  if (file.app.filePath) {
    // mac默认打开文件命令
    command = `open -a "${file.app.filePath}" "${file.filePath}"`
  } else command = `open ${file.filePath}`
  exec(command, (error) => {
    if (error) {
      dialog.showErrorBox('打开文件失败', '打开文件失败,请检查打开的方式或者文件是否存在')
    } else {
      getWindow(e)?.hide()
    }
  })
}
/*

使用准确打开,必须安装Vscode的命令行工具
如果你的电脑上没有设置code命令，你可以按照以下步骤进行设置：
打开 Visual Studio Code。
1. 在菜单栏中选择 View（视图） > Command Palette（命令面板），或者使用快捷键 Ctrl + Shift + P。
2. 在命令面板中输入 Shell Command: Install 'code' command in PATH（安装 'code' 命令到 PATH），然后选择该命令。
3. 等待安装完成后，关闭终端窗口（如果有打开的话）。
4. 现在，你应该能够在命令行中使用 code 命令来打开 Visual Studio Code 了。
如果你在安装过程中遇到任何问题，请参考 Visual Studio Code 的官方文档，其中提供了更详细的说明和解决方案：
https://code.visualstudio.com/docs/setup/mac（如果你使用的是 macOS）
或 https://code.visualstudio.com/docs/setup/linux（如果你使用的是 Linux）。
 */
function openFileWithVSCode(filePath = '') {
  // 文件已经被打开，激活窗口
  exec(`/usr/local/bin/code --goto "${filePath}"`, (error) => {
    if (error) {
      dialog.showErrorBox('error', JSON.stringify(error))
    }
  })
  // // 检查文件是否已经被打开
  // exec(`/usr/local/bin/code --reuse-window "${filePath}"`, (error) => {
  //   if (error) {
  //     dialog.showErrorBox('error', JSON.stringify(error))
  //     // 文件未被打开，使用VS Code打开文件
  //     exec(`/usr/local/bin/code "${filePath}"`, (error) => {
  //       dialog.showErrorBox('error', JSON.stringify(error))
  //       if (error) {
  //         console.error(`无法打开文件：${filePath}`, error)
  //         // 处理错误的逻辑
  //       }
  //     })
  //   } else {
  //   }
  // })
}
