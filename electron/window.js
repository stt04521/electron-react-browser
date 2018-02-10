/**
 * Created by shishitengteng on 2018/1/17.
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const _ = require('lodash');
const { child_process, exec } = require('child_process');

const ysfsPath = path.join(__dirname, '../ysfs/');
const ysfsInitPath = path.join(ysfsPath, '.ysfs/');

let windowHandleArr = [];

let dist;
if (process.env.NODE_ENV === 'dev') {
    dist = {
        home: 'http://localhost:1313'
    };
} else {
    dist = path.join(__dirname, '../dist');
}

function ipcMsgPump() {
    app.on('browser-window-created', (event, window) => {
        windowHandleArr.push({ name: window.getTitle(), handle: window });
    });

    ipcMain.on('open', (event, args) => {
        if (_.findIndex(windowHandleArr, { name: args[0] }) === -1) {
            const width = (args[1].indexOf('/home.html') !== -1) ? 320 : 900;
            const height = (args[1].indexOf('/home.html') !== -1) ? 690 : 600;
            const win = new BrowserWindow({
                minWidth: width,
                //maxWidth: width,
                minHeight: height,
                width: width,
                height: height,
                resizable: true,
                // autoHideMenuBar: true,
                // frame: false,
                show: false,
                title: args[0]
            });
            win.once('ready-to-show', () => win.show());
            win.loadURL(dist[args[0]] + args[1]);
            win.webContents.openDevTools();
        }
    });

    ipcMain.on('minimize', (event, args) => {
        const index = _.findIndex(windowHandleArr, { name: args[0] });
        if (index === -1) return;
        windowHandleArr[index].handle.minimize();
    });

    ipcMain.on('close', (event, args) => {
        const index = _.findIndex(windowHandleArr, { name: args[0] });
        if (index === -1) return;
        windowHandleArr[index].handle.close();
        _.pullAt(windowHandleArr, index);
    });

    ipcMain.on('exit-app', (event) => {
        let _command = 'ysfs.exe shutdown';

        if (process.platform === 'darwin') {
            _command = 'ysfs-darwin shutdown';
        } else if (process.platform === 'linux') {
            _command = 'ysfs-linux daemon';
        } else if (process.platform === 'win32') {
            _command = 'ysfs.exe shutdown';
        }

        exec(path.join(ysfsPath, _command), {
            env: { IPFS_PATH: ysfsInitPath }
        }, (error, stdout, stderr) => {
            if (error) {
                //console.error(`exec error: ${error}`);
                return;
            }
        });

        return app.exit();
    });
}
module.exports = { ipcMsgPump }