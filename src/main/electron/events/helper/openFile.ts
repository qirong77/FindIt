import { exec } from 'child_process'
import { getWindow } from '../../utils/getWindow'
import { dialog } from 'electron'
export const openFile = (e: Electron.IpcMainEvent, filePath = '', appPath = '') => {
  if (appPath.includes('Visual Studio Code')) {
    openFileWithVSCode(filePath)
    return
  }
  let command = ''
  if (appPath) {
    command = `open -a "${appPath}" "${filePath}"`
  } else command = `open ${filePath}`
  exec(command, (error) => {
    if (error) {
      console.log(filePath, appPath)
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
  // 检查文件是否已经被打开
  exec(`code --reuse-window "${filePath}"`, (error) => {
    if (error) {
      // 文件未被打开，使用VS Code打开文件
      exec(`code "${filePath}"`)
    } else {
      // 文件已经被打开，激活窗口
      exec(`code --goto "${filePath}"`)
    }
  })
}
