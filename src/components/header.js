import React, { Component } from 'react';
import { Link } from "react-scroll";
import FireEmoji from "../images/fire5.webp"

import Nav from "./nav";

class Header extends Component {

  
  getLocation = () => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Lat : " + position.coords.latitude + " Long: " + position.coords.longitude);
        this.setState({
          lat:position.coords.latitude,
          long:position.coords.longitude
        })
        return;
      })
    }
    else {
      console.info("geolocation is not supported in this environment");
    }

  }

  render() {
    return (

      <header>
        <Nav />
        <div className="head">
          <h1>Best of Halal <img src={FireEmoji} style={{ height: '63px', width: '54px' }} />< br /> <span>Near You.</span></h1>
          <div>
            <div> <Link className="contact" to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
              duration={500} >Get Started</Link> 
            </div>
            <div>
              <a className="locateme" 
                    onClick={this.getLocation}> 
                    <i class="fas fa-map-marker-alt"></i>  Locate Me
              </a>
            </div>
            <div>
              {this.state && <h3> {this.state.lat} </h3>}
              {this.state && <h3> {this.state.long} </h3>}
            </div>
          </div>
        </div>

      </header>

    );
  }
}

export default Header;
