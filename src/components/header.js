import React, { Component } from 'react';
import { Link } from "react-scroll";

import Nav from "./nav";

class Header extends Component {
  render() {
    return (

      <header>
        <Nav />
        <div className="head">
          <h1>Best of Halal,< br />  Near You</h1>
          <div>
            <div> <Link className="contact" to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
              duration={500} >Get Started</Link> </div>
          </div>
        </div>

      </header>

    );
  }
}

export default Header;
