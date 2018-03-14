/**
 * Created by shishitengteng on 2018/2/28.
 */
import React, { Component } from 'react';
import { List } from 'antd';
import { ipcRenderer } from 'electron';
import path from 'path';
import url from 'url';
// import './App.css';

export default class Menu extends Component {
    // Other code
    openPlayer = () => {
        ipcRenderer.send('open-window', {
            url: 'http://localhost:1313/player.html#/home',
            options: {
                title: '视频播放',
                width: 400,
                height: 600
            }
        });
    };
    openPDFWindow = () => {
        // let file = 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
        // file = 'file://D:/Workspaces/yuanshutech/yuanshutong/common/electron/123.pdf';
        // console.log(__dirname);
        // let windowURLPath = url.format({
        //     protocol: 'file:',
        //     pathname: path.join('D:/Workspaces/yuanshutech/yuanshutong/common/electron/pdfjs/web/viewer.html?file=', file),
        //     slashes: true
        // })
        //
        // windowURLPath = 'D:/Workspaces/yuanshutech/yuanshutong/common/electron/pdfjs/web/viewer.html?file=' + file;
        console.log('1111')
        ipcRenderer.send('file', ['markdown']);
    };
    openCodeWindow=()=>{
        ipcRenderer.send('file', ['changecode']);
    }
    render () {
        const data = [
            <span onClick={this.openPlayer}>打开视频播放窗口</span>,
            <span onClick={this.openPDFWindow}>打开markdown浏览窗口</span>,
            <span onClick={this.openCodeWindow}>打开编辑器浏览窗口</span>,
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ];
        return (<div style={{ padding: 20 }}>
            <h3 style={{ marginBottom: 16 }}>Menu</h3>
            <List
                bordered
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </div>);
    }
}

