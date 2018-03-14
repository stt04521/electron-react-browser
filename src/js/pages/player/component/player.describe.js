/**
 * Created by shishitengteng on 2018/3/12.
 */
import React, { Component } from 'react';
import { Card } from 'antd';
import style from '../css/player.describe.css';

const data = [
    {
        title: '文件名称'
    },
    {
        title: '文件大小'
    },
    {
        title: '文件发布时间'
    },
    {
        title: '文件作者'
    },
    {
        title: '文件描述'
    }
];

export default class PlayerDescribe extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    render () {
        return (
            <div className='describe'>
                <Card style={{ width: '100%' }}>
                    <p>文件名称:</p>
                    <p>文件大小:</p>
                    <p>文件发布时间:</p>
                    <p>文件作者:</p>
                    <p>文件描述:</p>
                </Card>
            </div>
        );
    }
}
