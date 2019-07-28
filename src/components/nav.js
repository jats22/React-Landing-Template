import React, { Component } from 'react';
import Logo from '../images/chip_3.png';


class Nav extends Component {
  render() {
    return (
      <nav>
          <ul>
              <li className="logo"><img src={Logo} style={{height:'22px'}}></img> Silicon<span>Labs</span></li>
          </ul>
          <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Mission</a></li>
              <li><a href="#">Contact</a></li>
          </ul>
      </nav>
    );
  }
}

export default Nav;
