import React, { useState } from 'react';
import { Link } from "react-scroll";
import useWindowScrollPosition from "@rehooks/window-scroll-position";

import Logo from '../images/chicken-leg.png';

import SideNav from "./sidenav";

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

  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  return (
    <nav style={style} >
      <SideNav/>
      <ul style={{gridTemplateColumns: '0.2fr 8fr 1fr'}}>
        <li><span style={{fontSize:'26px',cursor:'pointer'}} onClick={openNav} className="hamburger"> &#9776;</span></li>
        <li className="logo"><div><img src={Logo} style={{ height: '32px',margin: '2px 0px 0px',padding: '0px 2px' }}></img> Halal<span>Street</span></div></li>
      </ul>
      <ul className="mainNav">
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
