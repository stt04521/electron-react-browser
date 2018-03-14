/**
 * Created by shishitengteng on 2018/2/27.
 */
import React, { Component } from 'react';
import { Player, ControlBar, ReplayControl, ForwardControl, BigPlayButton, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';
import DownloadButton from '../component/player.downloadButton';
import Header from '../component/player.header';
import Describe from '../component/player.describe';

export default class Vplayer extends Component {
    render () {
        return (
            <div className='player'>
                <Header />
                <Player
                    autoPlay={false}
                >
                    <source src='http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4' />
                    <ControlBar autoHide={false}>
                        <BigPlayButton position='center' />
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={30} order={1.2} />
                        <VolumeMenuButton vertical />
                        <PlaybackRateMenuButton
                            rates={[5, 2, 1, 0.5, 0.1]}
                            order={7.1}
                        />
                        <VolumeMenuButton disabled />
                        <DownloadButton order={7} />
                    </ControlBar>
                </Player>
                <Describe />
            </div>
        );
    }
}
