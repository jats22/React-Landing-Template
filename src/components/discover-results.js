import React, { Component, Fragment } from 'react';
import request from "superagent";

import RecipeReviewCard from "./cards";

import { css } from '@emotion/core';
// First way to import
import { MoonLoader } from 'react-spinners';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: green;
`;

class DiscoverResults extends Component {

    getLocation = () => {

    this.setState({
        isLoading:true
    })
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Lat : " + position.coords.latitude + " Long: " + position.coords.longitude);
            this.setState({
            lat:position.coords.latitude,
            long:position.coords.longitude,
            locationAvailable: true,
            isLoading:false
            })
            this.loadRestos();
            return;
        },()=>{
    
            alert('Please enable your GPS position feature.');  
    
            },{maximumAge:600000, timeout:5000, enableHighAccuracy: false}
        )
    }
        else {
        console.info("geolocation is not supported in this environment");
    }
    
    }

    constructor(props) {
        super(props);

        // Sets up our initial state
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            restos: [],
            lat:null,
            long:null,
            locationAvailable:false
        };

        // Binds our scroll event handler
        // window.onscroll = () => {
        //   const {
        //     loadRestos,
        //     state: {
        //       error,
        //       isLoading,
        //       hasMore,
        //     },
        //   } = this;

        //   // Bails early if:
        //   // * there's an error
        //   // * it's already loading
        //   // * there's nothing left to load
        //   if (error || isLoading || !hasMore) return;

        //   // Checks that the page has scrolled to the bottom
        //   if (
        //     window.innerHeight + document.documentElement.scrollTop
        //     === document.documentElement.offsetHeight
        //   ) {
        //     loadRestos();
        //   }
        // };
    }

    componentWillMount() {
        // Loads some users on initial load
        // this.loadRestos();
    }

    loadRestos = () => {
        this.setState({ isLoading: true }, () => {
            request
                .get('https://randomuser.me/api/?results=10')
                .then((results) => {
                    // Creates a massaged array of user data
                    const nextUsers = results.body.results.map(user => ({
                        email: user.email,
                        name: Object.values(user.name).join(' '),
                        photo: user.picture.medium,
                        username: user.login.username,
                        uuid: user.login.uuid,
                    }));

                    // Merges the next users into our existing users
                    this.setState({
                        // Note: Depending on the API you're using, this value may be
                        // returned as part of the payload to indicate that there is no
                        // additional data to be loaded
                        hasMore: (this.state.restos.length < 100),
                        isLoading: false,
                        restos: [
                            ...this.state.restos,
                            ...nextUsers,
                        ],
                    });
                })
                .catch((err) => {
                    this.setState({
                        error: err.message,
                        isLoading: false,
                    });
                })
        });
    }

    render() {
        const {
            error,
            hasMore,
            isLoading,
            restos,
            locationAvailable
        } = this.state;

        return (
            <Fragment key="1" >
                {!locationAvailable && 
                    <div>
                    <a className="locateme" 
                            onClick={this.getLocation}> 
                            <i class="fas fa-map-marker-alt"></i>  Locate Me
                    </a>
                    </div>
                }
                <ul>
                    {locationAvailable && restos.map(user => (
                        <li><RecipeReviewCard title={user.name} subheader={user.email} content={user.username} image={user.photo} /></li>

                    ))}
 
                    {locationAvailable && hasMore && ! isLoading &&
                        <li><a className="seemore" onClick={this.loadRestos} >See More</a></li>
                    }
                </ul>
                {error &&
                    <div style={{ color: '#900' }}>
                        {error}
                    </div>
                }
                {isLoading &&
                    <div>
                        <MoonLoader
                            css={override}
                            sizeUnit={"px"}
                            size={60}
                            loading={isLoading}
                        />
                    </div>
                }
                {!hasMore &&
                    <h3>Thats all we have! We're constantly adding restaurants, please check back soon!</h3>
                }
            </Fragment>
        );
    }
}

export default DiscoverResults;
