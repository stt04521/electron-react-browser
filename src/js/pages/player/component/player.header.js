/**
 * Created by shishitengteng on 2018/3/12.
 */
import React, { Component } from 'react';
import style from '../css/player.header.css';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export default class PlayerHeader extends Component {
    closeClick () {
        ipcRenderer.send('close', ['player']);
    }
    render () {
        return (
            <div className={style.homeTitle}>
                <span className={style.homeLogo}>
                    <span>试试水.mp4</span>
                </span>
                <div className={style.homeClose} onClick={this.closeClick}>
                    <span><i className='iconfont icon-jianhao' /></span>
                    <span><i className='iconfont icon-guanbi1' /></span>
                </div>
            </div>
        );
    }
}
