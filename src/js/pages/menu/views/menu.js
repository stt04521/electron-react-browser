/**
 * Created by shishitengteng on 2018/2/28.
 */
import React, { Component } from 'react';
import { List } from 'antd';
import { ipcRenderer } from 'electron';
import path from 'path';
import url from 'url';

export default class Menu extends Component {
    // Other code
    openPlayer = () => {
        ipcRenderer.send('open', {
            url: 'http://localhost:1313/player.html#/home',
            options: {
                title: 'player',
                width: 900,
                height: 600,
                // frame:false,
                resizable: false
            }
        });
    };
    openBrowser = () => {
        ipcRenderer.send('open', {
            url: 'http://localhost:1313/browser.html#/browser',
            options: {
                title: 'player',
                width: 900,
                height: 600,
                // frame:false,
                resizable: false
            }
        });
    };
    openPDFWindow = () => {
        ipcRenderer.send('pdf', {
            url: 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
            options: {
                title: 'pdf',
                width: 900,
                height: 600,
                // frame:false,
                resizable: false
            }
        });
    };
    render () {
        const data = [
            <span onClick={this.openPlayer}>打开视频播放窗口</span>,
            <span onClick={this.openPDFWindow}>打开PDF浏览窗口</span>,
            <span onClick={this.openBrowser}>小型浏览器</span>
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

