import React, { useState } from 'react';
import { Link } from "react-scroll";
import useWindowScrollPosition from "@rehooks/window-scroll-position";

import Logo from '../images/chip_3.png';

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
    backgroundColor: change ?   "black" : "transparent" ,
    boxShadow : change ? "0px 13px 13px -18px rgba(0,0,0,0.75)":"none",
    color : change ? 'black' : 'white',
  };

  let navClass = change ? 'nav-class-active':'nav-class';

  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  return (
    <nav className={navClass}>
      <SideNav/>
      <ul style={{gridTemplateColumns: '0.6fr 8fr 1fr'}}>
        <li><span style={{fontSize:'26px',cursor:'pointer'}} onClick={openNav} className="hamburger"> &#9776;</span></li>
        <li className="logo"><div>
          {/* <img src={Logo} style={{ height: '32px',margin: '2px 0px 0px',padding: '0px 2px' }}></img>  */}
          <i className="fa fa-bolt"> </i> Circuit<span>al</span></div></li>
      </ul>
      <ul className="mainNav">
        <li><Link to="sign-up" smooth={true} spy={true} className="sign-up" activeClass="active" offset={-70}
          duration={500}><b>Sign Up</b></Link></li>
        <li><Link to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} >Practice</Link></li>
        <li><Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} >About</Link></li>
        <li><Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
