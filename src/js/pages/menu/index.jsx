import { ipcRenderer } from 'electron';

import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'antd';

import path from 'path';
import url from 'url';

function openPlayer() {
    ipcRenderer.send('open-window', {
        url: 'http://localhost:1313/player.html',
        options: {
            title: '视频播放',
            width: 400,
            height: 600
        }
    });
}

function openPDFWindow() {
    let file = 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
    file = 'file://D:/Workspaces/yuanshutech/yuanshutong/common/electron/123.pdf';
console.log(__dirname);
    let windowURLPath = url.format({
        protocol: 'file:',
        pathname: path.join('D:/Workspaces/yuanshutech/yuanshutong/common/electron/pdfjs/web/viewer.html?file=', file),
        slashes: true
    })

    windowURLPath = 'D:/Workspaces/yuanshutech/yuanshutong/common/electron/pdfjs/web/viewer.html?file=' + file;

    ipcRenderer.send('open-window', {
        url: windowURLPath,
        options: {
            title: 'PDF浏览',
            width: 400,
            height: 600
        }
    });
}

const data = [
    <span onClick={ openPlayer }>打开视频播放窗口</span>,
    <span onClick={ openPDFWindow }>打开PDF浏览窗口</span>,
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

ReactDOM.render(
    <div style={{ padding: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Menu</h3>
        <List
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
        />
    </div>,
    document.getElementById('root')
);
