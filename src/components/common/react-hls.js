import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import Fullscreen from 'react-full-screen';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';

import VolumeBar from './volume-bar';
import SwitchView from './switch';
import Pause from '../../assets/pause.svg'
import Backward from '../../assets/backward.svg';
import Forward from '../../assets/forward.svg';
import Back from '../../assets/back.svg';
import Settings from '../../assets/settings.svg';
import Options from '../../assets/options.svg';
import Spinner from '../../assets/spinner.svg';

import SideNav from '../../components/sidenav';
import Play from '../../assets/play.svg';
import msToTime from '../common/utils';

class ReactHls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: Date.now(),
            isFull: false,
            showVolume: false,
            showControls: false,
            switchedView: false,
            isPlaying: false,
            currentMillisecond: 0.0,
            totalMilliseconds: 1000,
            currentSectionIndex: 0,
            currentSubsectionIndex: 0,
            selectedSectionIndex: 0,
            timeout:null,
        };

        this.hls = null;
        this.video = React.createRef();
        // this.changeButtonType = this.changeButtonType.bind(this);
    }

    goFull = () => {
        if (this.state.isFull) {
            this.setState({ isFull: false });
        }
        else {
            this.setState({ isFull: true });
        }
    }

    // componentDidUpdate() {
    //     this._initPlayer();
    // }

    componentDidMount() {
        // Get a handle to the player

        const { video, videoBack, btnPlayPause, btnMute, btnFullScreen, progressBar, volumeBar } = this.refs;


        // Update the video volume
        let self = this;
        if (window.screen.orientation) {
            window.screen.orientation.addEventListener("change", function (evt) {
                if (window.screen.orientation.type != 'landscape-primary' && self.state.isFull) {
                    window.screen.orientation.unlock();
                    self.goFull();
                }
            });
        }

        // btnFullScreen.disabled = true;
        // Add a listener for the timeupdate event so we can update the progress bar
        if (video) {
            video.addEventListener('timeupdate', this.updateProgressBar, false);

            let self = this;
            // Add a listener for the play and pause events so the buttons state can be updated
            video.addEventListener('play', function () {
                // Change the button to be a pause button
                // self.changeButtonType(btnPlayPause, Pause);
            }, false);

            video.addEventListener('pause', function () {
                // Change the button to be a play button
                // self.changeButtonType(btnPlayPause, Play );
            }, false);


            video.addEventListener('volumechange', function (e) {
                // Update the button to be mute/unmute

                // if (video.muted) self.changeButtonType(btnMute, 'Unmute');
                // else self.changeButtonType(btnMute, 'Mute');
            }, false);

            video.addEventListener('ended', function () { this.pause(); }, false);
        }

        if (progressBar)
            progressBar.addEventListener("click", this.seek);

        this._initPlayer(false);

    }

    componentWillUnmount() {
        // let { hls } = this;

        // if (hls) {
        //     hls.destroy();
        // }
    }

    _initPlayer(switchedView, next) {
        if (this.hls) {
            this.hls.destroy();
            this.hls2.destroy();
        }

        let { frontUrl, autoplay, hlsConfig, backUrl } = this.props;
        let { video, videoBack } = this.refs;
        let { isPlaying } = this.state;

        // console.log(switchedView)

        let hls = new Hls(hlsConfig);
        let hls2 = new Hls(hlsConfig)

        let url = switchedView ? backUrl : frontUrl;

        hls.loadSource(frontUrl);
        hls.attachMedia(video);

        hls2.loadSource(backUrl);
        hls2.attachMedia(videoBack);




        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            // console.log("video and hls.js are now bound together !");
            hls.on(Hls.Events.MANIFEST_PARSED, () => {

                if (isPlaying) {
                    video.play();
                }
            });
        });

        hls2.on(Hls.Events.MEDIA_ATTACHED, () => {
            // console.log("video and hls2.js are now bound together !");
            hls2.on(Hls.Events.MANIFEST_PARSED, () => {

                if (isPlaying) {
                    videoBack.play();
                }
            });
        });

        this.hls = hls;
        this.hls2 = hls2;

        video.addEventListener('timeupdate', this.updateProgressBar, false);

        if (next) {
            next();
        }
    }

    seek = (e) => {
        const { video, videoBack, progressBar } = this.refs;
        var percent = e.offsetX / progressBar.offsetWidth;
        video.currentTime = percent * video.duration;
        videoBack.currentTime = percent * video.duration;
        e.target.value = Math.floor(percent / 100);
        e.target.innerHTML = progressBar.value + '% played';
    }

    seekToTime = (timeInMicroSeconds) => {
        const { video, videoBack } = this.refs;
        const { isPlaying } = this.state;
        video.currentTime = timeInMicroSeconds;
        videoBack.currentTime = timeInMicroSeconds;
        // video.play();
        if (isPlaying) {
            video.play();
            videoBack.play();
        }
    }

    playPauseVideo = () => {
        const { video, videoBack, switchedView, btnPlayPause } = this.refs;


        if (video.paused || video.ended) {
            video.play();
            videoBack.play();

            this.setState({
                isPlaying: true,
            })
        }
        else {
            video.pause();
            videoBack.pause();

            this.setState({
                isPlaying: false,
            })
        }
    }

    // Stop the current media from playing, and return it to the start position
    stopVideo = () => {
        const { video } = this.refs;
        video.pause();
        // console.log(this.refs)

        if (video.currentTime) video.currentTime = 0;
        this.setState({
            isPlaying: false,
        })
    }

    // Toggles the media player's mute and unmute status
    muteVolume = () => {

        const { video, btnMute } = this.refs;

        if (video.muted) {
            // Change the button to a mute button
            // this.changeButtonType(btnMute, 'Mute');
            video.muted = false;
        }
        else {
            // Change the button to an unmute button
            // this.changeButtonType(btnMute, 'Unmute');
            video.muted = true;
        }
    }

    // Replays the media currently loaded in the player
    replayVideo = () => {
        const { video } = this.refs;
        this.resetPlayer();
        if (!video.paused)
            video.play();
    }

    // Update the progress bar
    updateProgressBar = () => {
        const { video, progressBar } = this.refs;

        // console.log(video.duration)

        if (video) {
            // console.log(video.currentTime*1000)
            this.setState({
                currentMillisecond: video.currentTime * 1000,
                totalMilliseconds: !video.duration ? this.state.totalMilliseconds : video.duration * 1000,
            })
        }

        // Work out how much of the media has played via the duration and currentTime parameters
        var percentage = 0;
        if (video && video.duration > 0) {
            percentage = Math.floor((100 / video.duration) * video.currentTime);
        }

        // // console.log(percentage)
        // // Update the progress bar's value
        if (progressBar)
            progressBar.value = percentage;
        // Update the progress bar's text (for browsers that don't support the progress element)
        // progressBar.innerHTML = percentage + '% played';
    }

    // Updates a button's title, innerHTML and CSS class
    changeButtonType = (img, value) => {
        // btn.title = value;
        img.src = value;
        // btn.className = value;
    }

    resetPlayer = () => {

        const { progressBar, video, btnPlayPause } = this.refs;

        progressBar.value = 0;
        // Move the media back to the start
        video.currentTime = 0;
        // Set the play/pause button to 'play'
        // this.changeButtonType(btnPlayPause, 'Play');
    }

    forward = () => {
        const { progressBar, video, videoBack } = this.refs;
        const { isPlaying } = this.state;
        video.currentTime = video.currentTime + 15; // Todo: handle edge case here
        videoBack.currentTime = videoBack.currentTime + 15;
        // this.updateProgressBar();
        if (isPlaying) {
            video.play();
            videoBack.play();
        }
    }

    backward = () => {
        const { progressBar, video, videoBack } = this.refs;
        const { isPlaying } = this.state;
        video.currentTime = video.currentTime - 15; // Todo: handle edge case here. 
        videoBack.currentTime = videoBack.currentTime - 15;
        // this.updateProgressBar();
        if (isPlaying) {
            video.play();
            videoBack.play();
        }
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

    lockOrientation = () => {
        if (window.screen.orientation) {
            window.screen.orientation.lock("landscape-primary")
                .then(function () {
                    console.log("in landspace mode")
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }
    toggleFullScreen = () => {
        const { player } = this.refs;

        // this.goFull();

        if (player.requestFullscreen)
            if (document.fullScreenElement) {
                document.cancelFullScreen();
                window.screen.orientation.unlock();
            } else {
                player.requestFullscreen();
                this.lockOrientation();
            }
        else if (player.msRequestFullscreen)
            if (document.msFullscreenElement) {
                document.msExitFullscreen();
                window.screen.orientation.unlock();
            } else {
                player.msRequestFullscreen();
                this.lockOrientation();
            }
        else if (player.mozRequestFullScreen)
            if (document.mozFullScreenElement) {
                document.mozCancelFullScreen();
                window.screen.orientation.unlock();
            } else {
                player.mozRequestFullScreen();
                this.lockOrientation();
            }
        else if (player.webkitRequestFullscreen)
            if (document.webkitFullscreenElement) {
                document.webkitCancelFullScreen();
                window.screen.orientation.unlock();
            } else {
                player.webkitRequestFullscreen();
                this.lockOrientation();
            }

        else {
            alert("Fullscreen is not supported in your browser");
        }
    }

    handleMouseEnter = () => {
        // console.log("test");
        this.setState({
            showVolume: true,
        })
    }

    handleMouseLeave = () => {
        // console.log("test");
        this.setState({
            showVolume: false,
        })
    }

    hideControls = (e) => {

        // console.log(e.clientX)

        this.setState({
            showControls: false,
        })
    }

    openNav = () => {
        document.getElementById("mySidenav").style.width = "45%";
    }

    sectionChange = (currentSectionIndex, change) => {
        this.setState({
            currentSectionIndex: currentSectionIndex + change,
        })
    }

    onSubsectionChange = (time, subsectionIndex, sectionIndex) => {
        this.seekToTime(time);
        this.setState({
            selectedSectionIndex: sectionIndex,
            currentSubsectionIndex: subsectionIndex,
        })
    }

    render() {
        let { playerId, isFull, isPlaying,timeout, selectedSectionIndex, currentMillisecond, currentSubsectionIndex, totalMilliseconds, currentSectionIndex, showVolume, showControls, switchedView } = this.state;
        // let timeout;

        const { controls, width, poster, videoProps, sections } = this.props;

        // console.log(sections)

        let height = '100%';

        let playerControls = showControls ? "player-controls show" : "player-controls";
        let playPauseControl = showControls ? "playPause" : "playPauseShow";
        let topControls = showControls ? "top-controls" : "top-controls-hide";
        let toggleFullScreen = isFull ? "player-area-full" : "player-area";
        let playerContainerControls = showControls ? "player-container-controls" : "player-container";
        let playButtonSrc = isPlaying ? Pause : Play;

        if (!sections)
            return <div></div>
        return (
            <section>
                {!isFull && <p className='fullscreen' title='toggle full screen' accessKey="T" onClick={() => {
                    this.toggleFullScreen();
                    this.goFull();
                }}>Tap me to watch</p>}
                <div key={playerId} className={toggleFullScreen}>
                    {/* <Fullscreen
                        enabled={this.state.isFull}
                        onChange={isFull => this.setState({ isFull })}
                    > */}
                    <div ref="player" className={playerContainerControls}>
                        <video ref="video"
                            className="hls-player"
                            id={`react-hls-1`}
                            //    controls={controls}
                            width={'100%'}
                            style={{
                                height: height,
                                background: 'black',
                                objectFit: 'cover',
                                display: switchedView ? 'none' : 'block',
                            }}
                            muted={!switchedView ? false : true}
                            poster={poster}
                            preload='metadata'
                            onMouseMove={(e) => {
                                clearTimeout(timeout);
                                timeout = setTimeout(this.hideControls, 6500, e);
                                if (!this.state.showControls) {
                                    this.setState({
                                        showControls: true,
                                    })
                                }
                            }}

                            {...videoProps}
                        ></video>
                        <video ref="videoBack"
                            className="hls-player"
                            id={`react-hls-2`}
                            width={'100%'}
                            style={{
                                height: height,
                                background: 'black',
                                objectFit: 'cover',
                                display: switchedView ? 'block' : 'none',
                            }}
                            muted={switchedView ? false : true}
                            poster={poster}
                            preload='metadata'
                            onMouseMove={(e) => {
                                clearTimeout(timeout);
                                timeout = setTimeout(this.hideControls, 6500, e);
                                if (!this.state.showControls) {
                                    this.setState({
                                        showControls: true,
                                    })
                                }
                            }}

                            {...videoProps}
                        ></video>
                        <div className={playPauseControl}>
                            <img src={Backward} height="50px" width="50px" onClick={this.backward} />
                            <img ref='btnPlayPause' src={playButtonSrc} height="50px" width="50px" onClick={this.playPauseVideo} />
                            <img src={Forward} height="50px" width="50px" onClick={this.forward} />
                        </div>
                        <div id='controls' className={playerControls} onFocus={(e) => {
                            clearTimeout(timeout);
                            timeout = setTimeout(this.hideControls, 6500, e);
                            this.setState({
                                showControls: true,
                            })
                        }}>

                            <button className='play' title='play' accessKey="P" onClick={this.playPauseVideo}>{msToTime(currentMillisecond)} </button>

                            {/* <button ref='btnMute' className='mute' title='mute' onClick={this.muteVolume} >Mute</button> */}
                            <progress ref='progressBar' min='0' max='100' value='0'>0% played</progress>


                            <button className='mute' title='mute' onClick={this.forward}>{msToTime(totalMilliseconds)}</button>
                            {/* <button className='mute' title='mute' onClick={this.backward}> &gt; 15  </button> */}
                            <SwitchView switchedView={switchedView} handleChange={(value) => {
                                const { video } = this.refs;
                                // video.removeEventListener('timeupdate', this.updateProgressBar, false);

                                // this._initPlayer(value.target.checked,() => { 
                                this.setState({
                                    switchedView: value.target.checked,
                                });
                                // this.seekToTime(currentMillisecond / 1000);
                                

                                // });

                            }} />
                            {/* <button ref='btnReplay' className='replay' title='replay' accesskey="R" onClick={this.replayVideo}>Replay</button> */}
                        </div>
                        <div className={topControls} >
                            <img src={Back} height="30px" width="30px" onClick={() => {
                                this.toggleFullScreen();
                                this.goFull();
                                const { video, videoBack } = this.refs;
                                video.pause();
                                videoBack.pause();

                                this.setState({
                                    isPlaying: false,
                                })
                            }} />
                            <img></img>
                            <SideNav
                                onFocus={(e) => {
                                    clearTimeout(timeout);
                                    timeout = setTimeout(this.hideControls, 6500, e);
                                    this.setState({
                                        showControls: true,
                                    })
                                }}
                                onSubsectionClick={this.onSubsectionChange}
                                currentSectionIndex={currentSectionIndex}
                                currentSubsectionIndex={currentSubsectionIndex}
                                selectedSectionIndex={selectedSectionIndex}
                                sections={sections}
                                sectionChange={this.sectionChange}
                            />
                            <img src={Options} height="30px" width="30px" onClick={this.openNav} />
                            {/* <img src={Settings} height="30px" width="30px" onClick={this.forward} /> */}
                        </div>
                        <div className="right-control" onDoubleClick={this.forward}                             
                                onMouseMove={(e) => {
                                clearTimeout(timeout);
                                timeout = setTimeout(this.hideControls, 6500, e);
                                if (!this.state.showControls) {
                                    this.setState({
                                        showControls: true,
                                    })
                                }
                            }}>
                        </div>
                        <div className="left-control" onDoubleClick={this.backward}
                                                    onMouseMove={(e) => {
                                                        clearTimeout(timeout);
                                                        timeout = setTimeout(this.hideControls, 6500, e);
                                                        if (!this.state.showControls) {
                                                            this.setState({
                                                                showControls: true,
                                                            })
                                                        }
                                                    }}
                                                    >
                        </div>
                    </div>
                    {/* </Fullscreen> */}
                </div>
            </section>
        )
    }
}

ReactHls.propTypes = {
    frontUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
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
