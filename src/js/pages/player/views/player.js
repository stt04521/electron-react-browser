/**
 * Created by shishitengteng on 2018/2/27.
 */
import React, { Component } from 'react';
// import './App.css';

export default class App extends Component {
    // Other code

    render () {
        const sources = [
            { src: 'http://www.streambox.fr/playlists/test_001/stream.m3u8', type: 'application/x-mpegURL' },
            { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4' },
            { src: 'rtmp://firehose.cul.columbia.edu:1935/vod/mp4:sample.mp4', type: 'video/rtmp' }
        ],
        config = {},
        tracks = {};

        return (
            <video src='http://192.168.1.163:8080/ipfs/QmRDVC6FQyggs3K2rG8M2BuRmp2jbXzEYTttQ3UuKPhxva' controls='controls'>
                您的浏览器不支持 video 标签。
            </video>);
    }
}
