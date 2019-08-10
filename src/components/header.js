import React, { Component } from 'react';
import { Link } from "react-scroll";
import FireEmoji from "../images/fire5.webp"

import Nav from "./nav";

class Header extends Component {

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
