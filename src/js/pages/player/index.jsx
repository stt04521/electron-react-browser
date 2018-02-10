let videoSrc = 'https://qq.webrtc.win/tv/Pear-Demo-Yosemite_National_Park.mp4';
//var videoSrc = 'http://117.48.208.128:8080/ipfs/QmTpds2mvTnCrtuisGoE8WYdD4Wr69tvEv7LiDJZMPg8w1';

let player = new PearPlayer('#pearvideo', {
    //第一个参数为video标签的id或class
    type: 'mp4', //播放视频的类型,目前只能是mp4
    src: videoSrc, //视频播放的src
    useMonitor: false //是否开启monitor,会稍微影响性能,默认false
});

player.on('exception', onException);

function onException(exception) {
    var errCode = exception.errCode;
    switch (errCode) {
        case 1:
            //当前浏览器不支持WebRTC
            console.log(exception.errMsg);
            break;
    }
}

