/**
 * Created by shishitengteng on 2018/2/27.
 */
import React, { Component } from 'react';
// import './App.css';
import MediaElement from '../component/player.MediaElement';

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
            <MediaElement
                id='player1'
                mediaType='video'
                preload='none'
                controls
                width='640'
                height='360'
                poster=''
                sources={JSON.stringify(sources)}
                options={JSON.stringify(config)}
                tracks={JSON.stringify(tracks)}
            />);
    }
}
