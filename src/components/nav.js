import React, { useState } from 'react';
import { Link } from "react-scroll";
import useWindowScrollPosition from "@rehooks/window-scroll-position";

import Logo from '../images/halal.png';


function Nav() {

  const [change, setChange] = useState(true);
  const changePosition = 80;

  let position = useWindowScrollPosition();
  // position == { x: 0, y: 0 }

  if (position.y > changePosition && !change) {
    setChange(true);
  }

  if (position.y <= changePosition && change) {
    setChange(false);
  }

  let style = {
    backgroundColor: change ?   "white" : "transparent" ,
    boxShadow : change ? "0px 13px 13px -18px rgba(0,0,0,0.75)":"none" 
  };


  return (
    <nav style={style} >
      <ul>
        <li className="logo"><img src={Logo} style={{ height: '22px' }}></img> Halal<span>Street</span></li>
      </ul>
      <ul>
        <li><Link to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} >Discover</Link></li>
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

export default Nav;
