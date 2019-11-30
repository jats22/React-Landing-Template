import React from 'react';
import ReactHLS from './react-hls';


const player = (props) => { 
    return <ReactHLS url={"https://theverbmedia-output.s3.amazonaws.com/velu_backview/velu_backview.m3u8"} /> 
}


export default player;