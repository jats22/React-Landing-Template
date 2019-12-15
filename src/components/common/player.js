import React, { Component } from 'react';
import ReactHLS from './react-hls';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video : { "section":{}},
        }
        const videoAPI = "https://7mfhkvwjii.execute-api.us-east-1.amazonaws.com/dev/video/1";
        // fetch(videoAPI)
        //     .then(resp => resp.json())
        //     .then(data => {
        //         console.log(data);
                
        //     })

    }

    componentWillMount() {
        this.setState({
            video:{
                "id": 1,
                "song_name": "DANCE OFF",
                "instructor_id": 5,
                "video_code": "NULL",
                "url": "https://videos.theverbstudio.com/Classes/Full+class/Velu+Full+Class",
                "front_url": "https://theverbmedia-output.s3.amazonaws.com/kartik/kartik.m3u8",
                "back_url": "https://dgu0266wyhbs1.cloudfront.net/velu/velu.m3u8",
                "level": "INTERMEDIATE",
                "style": "HIP-HOP",
                "length": 62,
                "video_type": "STUDIO",
                "youtube_url": "https://www.youtube.com/watch?v=Hr6NM9k6hLg",
                "thumbnail_url": "https://d1c2wrc0o6t4ti.cloudfront.net/Classes/Mobile+UI/Thumbnails/Velu+Thumbnail.jpg",
                "gif_url": "https://d1c2wrc0o6t4ti.cloudfront.net/Classes/Mobile+UI/Thumbnails/Velu+Thumbnail.jpg",
                "is_active": 1,
                "section": {
                    "sections": [
                        {
                            "section": [
                                {
                                    "subSecDesc": "Moves",
                                    "offSetMicroSeconds": "80"
                                },
                                {
                                    "subSecDesc": "Slow Tempo",
                                    "offSetMicroSeconds": "563"
                                },
                                {
                                    "subSecDesc": "Medium Tempo ",
                                    "offSetMicroSeconds": "614"
                                },
                                {
                                    "subSecDesc": "Actual Tempo",
                                    "offSetMicroSeconds": "789"
                                },
                                {
                                    "subSecDesc": "Watch",
                                    "offSetMicroSeconds": "844"
                                },
                                {
                                    "subSecDesc": "Music",
                                    "offSetMicroSeconds": "876"
                                }
                            ],
                            "sectionDesc": "Section 1"
                        },
                        {
                            "section": [
                                {
                                    "subSecDesc": "Moves",
                                    "offSetMicroSeconds": "906"
                                },
                                {
                                    "subSecDesc": "Slow Tempo",
                                    "offSetMicroSeconds": "1879"
                                },
                                {
                                    "subSecDesc": "Medium Tempo ",
                                    "offSetMicroSeconds": "1970"
                                },
                                {
                                    "subSecDesc": "Actual Tempo",
                                    "offSetMicroSeconds": "2050"
                                },
                                {
                                    "subSecDesc": "From The Top",
                                    "offSetMicroSeconds": "2082"
                                },
                                {
                                    "subSecDesc": "Watch",
                                    "offSetMicroSeconds": "2157"
                                },
                                {
                                    "subSecDesc": "Music",
                                    "offSetMicroSeconds": "2210"
                                }
                            ],
                            "sectionDesc": "Section 2"
                        },
                        {
                            "section": [
                                {
                                    "subSecDesc": "Moves",
                                    "offSetMicroSeconds": "2265"
                                },
                                {
                                    "subSecDesc": "Slow Tempo",
                                    "offSetMicroSeconds": "3149"
                                },
                                {
                                    "subSecDesc": "Medium Tempo ",
                                    "offSetMicroSeconds": "3215"
                                },
                                {
                                    "subSecDesc": "Actual Tempo",
                                    "offSetMicroSeconds": "3338"
                                },
                                {
                                    "subSecDesc": "From The Top",
                                    "offSetMicroSeconds": "3375"
                                },
                                {
                                    "subSecDesc": "Watch",
                                    "offSetMicroSeconds": "3471"
                                },
                                {
                                    "subSecDesc": "Music",
                                    "offSetMicroSeconds": "3567"
                                }
                            ],
                            "sectionDesc": "Section 3"
                        }
                    ]
                },
                "release_date": "2019-12-06T06:52:41.000Z",
                "createdAt": "2019-12-06T01:22:41.000Z",
                "updatedAt": "2019-12-06T01:22:41.000Z"
            }
        })
    }

    render(){
        const { video } = this.state;
        return <ReactHLS hlsConfig={{startFragPrefetch:true,autoStartLoad:true}} poster={video.thumbnail_url} sections={video.section.sections} frontUrl={video.front_url} backUrl={video.back_url}/>;
    }
}


export default Player;