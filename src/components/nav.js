import React, { Component } from 'react';
import { Link } from "react-scroll";

import Logo from '../images/halal.png';


class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="logo"><img src={Logo} style={{ height: '22px' }}></img> Halal<span>Street</span></li>
        </ul>
        <ul>
          <li><Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
            duration={500} >About</Link></li>
          <li><Link to="mission" smooth={true} spy={true} activeClass="active" offset={-70}
            duration={500}>Mission</Link></li>
          <li><Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
            duration={500}>Contact</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
