'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import Fullscreen from "react-full-screen";


class ReactHls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: Date.now(),
            isFull: false,
        };

        this.hls = null;
        this.video = React.createRef();
        this.changeButtonType = this.changeButtonType.bind(this);
    }

    goFull = () => {
        if (this.state.isFull) {
            this.setState({ isFull: false });
        }
        else {
            this.setState({ isFull: true });
        }
    }

    componentDidUpdate() {
        this._initPlayer();
    }

    componentDidMount() {
        // Get a handle to the player

        const { video, btnPlayPause, btnMute, btnFullScreen, progressBar, volumeBar, updateProgressBar } = this.refs;


        // Update the video volume
        volumeBar.addEventListener("change", function (evt) {
            video.volume = evt.target.value;
        });

        // btnFullScreen.disabled = true;
        // Add a listener for the timeupdate event so we can update the progress bar
        video.addEventListener('timeupdate', updateProgressBar, false);

        // Add a listener for the play and pause events so the buttons state can be updated
        video.addEventListener('play', function () {
            // Change the button to be a pause button
            this.changeButtonType(btnPlayPause, 'pause');
        }, false);

        video.addEventListener('pause', function () {
            // Change the button to be a play button
            this.changeButtonType(btnPlayPause, 'play');
        }, false);

        video.addEventListener('volumechange', function (e) {
            // Update the button to be mute/unmute
            if (video.muted) this.changeButtonType(btnMute, 'unmute');
            else this.changeButtonType(btnMute, 'mute');
        }, false);

        video.addEventListener('ended', function () { this.pause(); }, false);

        progressBar.addEventListener("click", this.seek);

        this._initPlayer();
    }

    componentWillUnmount() {
        let { hls } = this;

        if (hls) {
            hls.destroy();
        }
    }

    _initPlayer() {
        if (this.hls) {
            this.hls.destroy();
        }

        let { url, autoplay, hlsConfig } = this.props;
        let { video: $video } = this.refs;
        let hls = new Hls(hlsConfig);

        hls.loadSource(url);
        hls.attachMedia($video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoplay) {
                $video.play();
            }
        });

        this.hls = hls;
    }

    seek = (e) => {
        const { video, progressBar } = this.refs;
        var percent = e.offsetX / progressBar.offsetWidth;
        video.currentTime = percent * video.duration;
        e.target.value = Math.floor(percent / 100);
        e.target.innerHTML = progressBar.value + '% played';
    }

    playPauseVideo = () => {
        const { video, btnPlayPause } = this.refs;

        if (video.paused || video.ended) {
            // Change the button to a pause button
            this.changeButtonType(btnPlayPause, 'pause');
            video.play();
        }
        else {
            // Change the button to a play button
            this.changeButtonType(btnPlayPause, 'play');
            video.pause();
        }
    }

    // Stop the current media from playing, and return it to the start position
    stopVideo = () => {
        const { video } = this.refs;
        video.pause();
        console.log(this.refs)
        if (video.currentTime) video.currentTime = 0;
    }

    // Toggles the media player's mute and unmute status
    muteVolume = () => {

        const { video, btnMute } = this.refs;

        if (video.muted) {
            // Change the button to a mute button
            this.changeButtonType(btnMute, 'mute');
            video.muted = false;
        }
        else {
            // Change the button to an unmute button
            this.changeButtonType(btnMute, 'unmute');
            video.muted = true;
        }
    }

    // Replays the media currently loaded in the player
    replayVideo = () => {
        const { video } = this.refs;
        this.resetPlayer();
        video.play();
    }

    // Update the progress bar
    updateProgressBar = () => {
        const { video, progressBar } = this.refs;

        console.log(video)
        // Work out how much of the media has played via the duration and currentTime parameters
        var percentage = Math.floor((100 / video.duration) * video.currentTime);
        // Update the progress bar's value
        progressBar.value = percentage;
        // Update the progress bar's text (for browsers that don't support the progress element)
        progressBar.innerHTML = percentage + '% played';
    }

    // Updates a button's title, innerHTML and CSS class
    changeButtonType = (btn, value) => {
        btn.title = value;
        btn.innerHTML = value;
        btn.className = value;
    }

    resetPlayer = () => {

        const { progressBar, video, btnPlayPause } = this.refs;

        progressBar.value = 0;
        // Move the media back to the start
        video.currentTime = 0;
        // Set the play/pause button to 'play'
        this.changeButtonType(btnPlayPause, 'play');
    }

    exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    toggleFullScreen = () => {
        const { video } = this.refs;

        if (video.requestFullscreen)
            if (document.fullScreenElement) {
                document.cancelFullScreen();
            } else {
                video.requestFullscreen();
            }
        else if (video.msRequestFullscreen)
            if (document.msFullscreenElement) {
                document.msExitFullscreen();
            } else {
                video.msRequestFullscreen();
            }
        else if (video.mozRequestFullScreen)
            if (document.mozFullScreenElement) {
                document.mozCancelFullScreen();
            } else {
                video.mozRequestFullScreen();
            }
        else if (video.webkitRequestFullscreen)
            if (document.webkitFullscreenElement) {
                document.webkitCancelFullScreen();
            } else {
                video.webkitRequestFullscreen();
            }
        else {
            alert("Fullscreen is not supported in your browser");
        }
    }

    render() {
        let { playerId, isFull } = this.state;
        console.log("test");

        const { controls, width, poster, videoProps } = this.props;

        let height = isFull ? 'calc(100% - 20px)' : '100%';

        return (
            <div key={playerId} className="player-area">
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={isFull => this.setState({ isFull })}
                >
                    <div className="player-container">
                        <video ref="video"
                            className="hls-player"
                            id={`react-hls-${playerId}`}
                            //    controls={controls}
                            width={'100%'}
                            style={{ height: height }}

                            poster={poster}
                            {...videoProps}></video>
                        <div id='controls' style={{
                            width: '100%',
                            background:'grey',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'
                        }}>
                            <button ref='btnPlayPause' className='play' title='play' accessKey="P" onClick={this.playPauseVideo}>Play</button>
                            <input type="range" ref="volumeBar" title="volume" min="0" max="1" step="0.1" defaultValue="1" />
                            <progress ref='progressBar' min='0' max='100' value='0'>0% played</progress>
                            {/* <button ref='btnStop' className='stop' title='stop' accesskey="X" onClick={this.stopVideo}>Stop</button> */}

                            <button ref='btnMute' className='mute' title='mute' onClick={this.muteVolume}>Mute</button>
                            <button ref='btnFullScreen' className='fullscreen' title='toggle full screen' accessKey="T" onClick={this.goFull}>[&nbsp;&nbsp;]</button>
                            {/* <button ref='btnReplay' className='replay' title='replay' accesskey="R" onClick={this.replayVideo}>Replay</button> */}
                        </div>
                    </div>
                </Fullscreen>
            </div>
        )
    }
}

ReactHls.propTypes = {
    url: PropTypes.string.isRequired,
    autoplay: PropTypes.bool,
    hlsConfig: PropTypes.object, //https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
    controls: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    poster: PropTypes.string,
    videoProps: PropTypes.object
}

ReactHls.defaultProps = {
    autoplay: false,
    hlsConfig: {},
    controls: true,
    width: 500,
    height: 375
}

export default ReactHls;
