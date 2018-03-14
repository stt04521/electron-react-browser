/**
 * Created by shishitengteng on 2018/3/14.
 */
/**
 * Created by shishitengteng on 2018/2/28.
 */
import React, { Component } from 'react';
import { List } from 'antd';

export default class Menu extends Component {
    // Other code
    render () {
        const data = [
            <span onClick={this.openPlayer}>打开视频播放窗口</span>,
            <span onClick={this.openPDFWindow}>打开PDF浏览窗口</span>,
            <span onClick={this.openPDFWindow}>小型浏览器</span>
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

