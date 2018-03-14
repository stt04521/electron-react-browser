const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const { ipcMsgPump } = require('./window');
ipcMsgPump();
const path = require('path');
const url = require('url');


// 设置主进程窗口标题
let title = 'menu';

// 设置应用登录窗口打开路径
let windowURLPath;

if (process.env.NODE_ENV === 'dev')
    windowURLPath = "http://localhost:1313/menu.html#/menu";
else
    windowURLPath = url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, 'web/menu.html'),
        slashes: true
    })

// 主窗口
let mainWindow;

function createMainWindow() {
    // 创建主进程窗口
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        title: title,
        center: true,
        //frame: false,
        //resizable: false,
        //transparent: false
    })

    // 设置主进程窗口URL
    mainWindow.loadURL(windowURLPath);

    // 当关闭主进程窗口时销毁主进程窗口对象
    // 后续主进程窗口会隐藏，只到发出退出应用的指令
    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}

// 当Electron环境准备完成后，打开主进程窗口
app.on('ready', createMainWindow)


// 当所有窗口关闭时退出应用
app.on('window-all-closed', function () {
    app.quit();
})

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
    }
})

