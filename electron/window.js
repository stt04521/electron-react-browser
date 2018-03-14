/**
 * Created by shishitengteng on 2018/1/17.
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const _ = require('lodash');
const url = require('url');
const { child_process, exec } = require('child_process');
const PDFWindow = require('electron-pdf-window')

const ysfsPath = path.join(__dirname, '../ysfs/');
const ysfsInitPath = path.join(ysfsPath, '.ysfs/');

let windowHandleArr = [];

let dist;
if (process.env.NODE_ENV === 'dev') {
    dist = {
        home: 'http://localhost:1313',
        markdown: 'markdown/index.html',
        changecode: 'changecode/index.html'
    };
} else {
    dist = path.join(__dirname, '../dist');
}

function ipcMsgPump() {
    app.on('browser-window-created', (event, window) => {
        windowHandleArr.push({ name: window.getTitle(), handle: window });
    });

    ipcMain.on('open', (event, args) => {
        if (_.findIndex(windowHandleArr, { name: args.options.title }) === -1) {
            const win = new BrowserWindow(args.options);
            win.once('ready-to-show', () => win.show());
            win.loadURL(args.url);
        }
    });

    ipcMain.on('pdf', (event, args) => {
        if (_.findIndex(windowHandleArr, { name: args.options.title }) === -1) {
            const win = new PDFWindow(args.options);
            win.once('ready-to-show', () => win.show());
            win.loadURL(args.url);
        }
    });

    ipcMain.on('minimize', (event, args) => {
        const index = _.findIndex(windowHandleArr, { name: args[0] });
        if (index === -1) return;
        windowHandleArr[index].handle.minimize();
    });

    ipcMain.on('file', (event, args) => {
        const fileUrl = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, dist[args[0]]),
            slashes: true
        });
        console.log(fileUrl);
        const win = new BrowserWindow({
            minWidth: 900,
            //maxWidth: width,
            minHeight: 600,
            width: 900,
            height: 600,
            resizable: true,
            // autoHideMenuBar: true,
            // frame: false,
            show: false,
            title: args[0]
        });
        win.once('ready-to-show', () => win.show());
        win.loadURL(fileUrl);
    });


    ipcMain.on('close', (event, args) => {
        const index = _.findIndex(windowHandleArr, { name: args[0] });
        if (index === -1) return;
        console.log('11');
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