import React, { useState } from 'react';
import { Link } from "react-scroll";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import Face from '@material-ui/icons/Face';
import Logo from '../images/chip_3.png';

import SideNav from "./sidenav";

function Nav(props) {

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
    backgroundColor: change ? "black" : "transparent",
    boxShadow: change ? "0px 13px 13px -18px rgba(0,0,0,0.75)" : "none",
    color: change ? 'black' : 'white',
  };

  let navClass = change || props.arena ? 'nav-class-active' : 'nav-class';

  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  return (
    <nav className={navClass}>
      <SideNav />
      <ul style={{ gridTemplateColumns: '0.3fr 2fr' }}>
        <li><span style={{ fontSize: '26px', cursor: 'pointer' }} onClick={openNav} className="hamburger"> &#9776;</span></li>
        <li className="logo"><div>
          {/* <img src={Logo} style={{ height: '32px',margin: '2px 0px 0px',padding: '0px 2px' }}></img>  */}
          <i className="fa fa-bolt"> </i> {!props.arena && <div style={{ display: 'initial' }} >Circuit<span>al</span></div>}
        </div>
        </li>
      </ul>
      <ul className="mainNav">
        <li><Link to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} > <b>Practice</b></Link></li>
        {props.arena && <li><Link activeClass="active" offset={-70}
          duration={500} >Dashboard</Link></li>}
        {/* {props.arena && <li><Link activeClass="active" offset={-70}
          duration={500} > <i class="fa fa-user" aria-hidden="true"></i>  Jatin</Link></li>} */}
        {!props.arena && <li><Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} >About</Link></li>}
        {!props.arena && <li><Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500}>Contact</Link></li>}

        {!props.arena && <li><Link className="login" activeClass="active" offset={-70}
          duration={500} >Login</Link></li>}
        {!props.arena && <li><Link to="sign-up" smooth={true} spy={true} className="sign-up" activeClass="active" offset={-70}
          duration={500}><b>Sign Up</b></Link></li>}
      </ul>
    </nav>
  );
}

export default Nav;
