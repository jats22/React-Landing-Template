'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hls = require('hls.js');

var _hls2 = _interopRequireDefault(_hls);

var _reactFullScreen = require('react-full-screen');

var _reactFullScreen2 = _interopRequireDefault(_reactFullScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHls = function (_React$Component) {
    _inherits(ReactHls, _React$Component);

    function ReactHls(props) {
        _classCallCheck(this, ReactHls);

        var _this = _possibleConstructorReturn(this, (ReactHls.__proto__ || Object.getPrototypeOf(ReactHls)).call(this, props));

        _this.goFull = function () {
            _this.setState({ isFull: true });
        };

        _this.seek = function (e) {
            var _this$refs = _this.refs,
                video = _this$refs.video,
                progressBar = _this$refs.progressBar;

            var percent = e.offsetX / progressBar.offsetWidth;
            video.currentTime = percent * video.duration;
            e.target.value = Math.floor(percent / 100);
            e.target.innerHTML = progressBar.value + '% played';
        };

        _this.playPauseVideo = function () {
            var _this$refs2 = _this.refs,
                video = _this$refs2.video,
                btnPlayPause = _this$refs2.btnPlayPause;


            if (video.paused || video.ended) {
                // Change the button to a pause button
                _this.changeButtonType(btnPlayPause, 'pause');
                video.play();
            } else {
                // Change the button to a play button
                _this.changeButtonType(btnPlayPause, 'play');
                video.pause();
            }
        };

        _this.stopVideo = function () {
            var video = _this.refs.video;

            video.pause();
            console.log(_this.refs);
            if (video.currentTime) video.currentTime = 0;
        };

        _this.muteVolume = function () {
            var _this$refs3 = _this.refs,
                video = _this$refs3.video,
                btnMute = _this$refs3.btnMute;


            if (video.muted) {
                // Change the button to a mute button
                _this.changeButtonType(btnMute, 'mute');
                video.muted = false;
            } else {
                // Change the button to an unmute button
                _this.changeButtonType(btnMute, 'unmute');
                video.muted = true;
            }
        };

        _this.replayVideo = function () {
            var video = _this.refs.video;

            _this.resetPlayer();
            video.play();
        };

        _this.updateProgressBar = function () {
            var _this$refs4 = _this.refs,
                video = _this$refs4.video,
                progressBar = _this$refs4.progressBar;


            console.log(video);
            // Work out how much of the media has played via the duration and currentTime parameters
            var percentage = Math.floor(100 / video.duration * video.currentTime);
            // Update the progress bar's value
            progressBar.value = percentage;
            // Update the progress bar's text (for browsers that don't support the progress element)
            progressBar.innerHTML = percentage + '% played';
        };

        _this.changeButtonType = function (btn, value) {
            btn.title = value;
            btn.innerHTML = value;
            btn.className = value;
        };

        _this.resetPlayer = function () {
            var _this$refs5 = _this.refs,
                progressBar = _this$refs5.progressBar,
                video = _this$refs5.video,
                btnPlayPause = _this$refs5.btnPlayPause;


            progressBar.value = 0;
            // Move the media back to the start
            video.currentTime = 0;
            // Set the play/pause button to 'play'
            _this.changeButtonType(btnPlayPause, 'play');
        };

        _this.exitFullScreen = function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        };

        _this.toggleFullScreen = function () {
            var video = _this.refs.video;


            if (video.requestFullscreen) {
                if (document.fullScreenElement) {
                    document.cancelFullScreen();
                } else {
                    video.requestFullscreen();
                }
            } else if (video.msRequestFullscreen) {
                if (document.msFullscreenElement) {
                    document.msExitFullscreen();
                } else {
                    video.msRequestFullscreen();
                }
            } else if (video.mozRequestFullScreen) {
                if (document.mozFullScreenElement) {
                    document.mozCancelFullScreen();
                } else {
                    video.mozRequestFullScreen();
                }
            } else if (video.webkitRequestFullscreen) {
                if (document.webkitFullscreenElement) {
                    document.webkitCancelFullScreen();
                } else {
                    video.webkitRequestFullscreen();
                }
            } else {
                alert("Fullscreen is not supported in your browser");
            }
        };

        _this.state = {
            playerId: Date.now(),
            isFull: false
        };

        _this.hls = null;
        _this.video = _react2.default.createRef();
        _this.changeButtonType = _this.changeButtonType.bind(_this);
        return _this;
    }

    _createClass(ReactHls, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._initPlayer();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Get a handle to the player

            var _refs = this.refs,
                video = _refs.video,
                btnPlayPause = _refs.btnPlayPause,
                btnMute = _refs.btnMute,
                btnFullScreen = _refs.btnFullScreen,
                progressBar = _refs.progressBar,
                volumeBar = _refs.volumeBar,
                updateProgressBar = _refs.updateProgressBar;

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
                if (video.muted) this.changeButtonType(btnMute, 'unmute');else this.changeButtonType(btnMute, 'mute');
            }, false);

            video.addEventListener('ended', function () {
                this.pause();
            }, false);

            progressBar.addEventListener("click", this.seek);

            this._initPlayer();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var hls = this.hls;


            if (hls) {
                hls.destroy();
            }
        }
    }, {
        key: '_initPlayer',
        value: function _initPlayer() {
            if (this.hls) {
                this.hls.destroy();
            }

            var _props = this.props,
                url = _props.url,
                autoplay = _props.autoplay,
                hlsConfig = _props.hlsConfig;
            var $video = this.refs.video;

            var hls = new _hls2.default(hlsConfig);

            hls.loadSource(url);
            hls.attachMedia($video);
            hls.on(_hls2.default.Events.MANIFEST_PARSED, function () {
                if (autoplay) {
                    $video.play();
                }
            });

            this.hls = hls;
        }

        // Stop the current media from playing, and return it to the start position


        // Toggles the media player's mute and unmute status


        // Replays the media currently loaded in the player


        // Update the progress bar


        // Updates a button's title, innerHTML and CSS class

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var playerId = this.state.playerId;

            console.log("test");

            var _props2 = this.props,
                controls = _props2.controls,
                width = _props2.width,
                height = _props2.height,
                poster = _props2.poster,
                videoProps = _props2.videoProps;


            return _react2.default.createElement(
                'div',
                { key: playerId, className: 'player-area' },
                _react2.default.createElement(
                    _reactFullScreen2.default,
                    {
                        enabled: this.state.isFull,
                        onChange: function onChange(isFull) {
                            return _this2.setState({ isFull: isFull });
                        }
                    },
                    _react2.default.createElement('video', _extends({ ref: 'video',
                        className: 'hls-player',
                        id: 'react-hls-' + playerId
                        //    controls={controls}
                        , width: width,
                        height: height,
                        poster: poster
                    }, videoProps)),
                    _react2.default.createElement(
                        'div',
                        { id: 'controls' },
                        _react2.default.createElement(
                            'button',
                            { ref: 'btnPlayPause', className: 'play', title: 'play', accesskey: 'P', onClick: this.playPauseVideo },
                            'Play'
                        ),
                        _react2.default.createElement('input', { type: 'range', ref: 'volumeBar', title: 'volume', min: '0', max: '1', step: '0.1', defaultValue: '1' }),
                        _react2.default.createElement(
                            'progress',
                            { ref: 'progressBar', min: '0', max: '100', value: '0' },
                            '0% played'
                        ),
                        _react2.default.createElement(
                            'button',
                            { ref: 'btnMute', className: 'mute', title: 'mute', onClick: this.muteVolume },
                            'Mute'
                        ),
                        _react2.default.createElement(
                            'button',
                            { ref: 'btnFullScreen', className: 'fullscreen', title: 'toggle full screen', accessKey: 'T', onClick: this.toggleFullScreen },
                            '[\xA0\xA0]'
                        )
                    )
                )
            );
        }
    }]);

    return ReactHls;
}(_react2.default.Component);

ReactHls.propTypes = {
    url: _propTypes2.default.string.isRequired,
    autoplay: _propTypes2.default.bool,
    hlsConfig: _propTypes2.default.object, //https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
    controls: _propTypes2.default.bool,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    poster: _propTypes2.default.string,
    videoProps: _propTypes2.default.object
};

ReactHls.defaultProps = {
    autoplay: false,
    hlsConfig: {},
    controls: true,
    width: 500,
    height: 375
};

exports.default = ReactHls;