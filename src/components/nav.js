import React, { useState } from 'react';
import { Link } from "react-scroll";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import Face from '@material-ui/icons/Face';
import Logo from '../images/chip_3.png';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import AuthDecorator from './auth';

import SideNav from "./sidenav";

const useStyles = makeStyles(theme => ({
  userIcon: {
    fontSize: '2.1em',
  },
}));

function Nav(props) {

  const classes = useStyles();
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
    document.getElementById("mySidenav").style.width = "60%";
  }

  return (
    <nav className={navClass}>
      <SideNav />
      <ul className="logo-container">
        <li><span style={{ fontSize: '26px', cursor: 'pointer', color: '#bcb9d0' }} onClick={openNav} className="hamburger"> <i class="fas fa-bars"></i></span></li>
        <li className="logo"><div>
          {/* <img src={Logo} style={{ height: '32px',margin: '2px 0px 0px',padding: '0px 2px' }}></img>  */}
          <span><i className="fa fa-bolt"></i></span> <div style={{ display: 'initial' }} ><RouterLink to="/" style={{ display: 'initial', color: 'inherit' }} className="mainLogo">Circuit<span>al</span></RouterLink></div>
        </div>
        </li>
      </ul>
      <ul className="mainNav">
        {props.arena && <li><div>&nbsp;</div></li>}
        {/* {props.arena && <li><div>&nbsp;</div></li>} */}
        {(props.arena && !props.takenDiagnostic) && <li><RouterLink to={{
          pathname: '/login',
          state: { to: '/arena?quizId=33103eea76083afe55b7' }

        }} className="sign-up" activeClass="active" offset={-70}
          duration={500} >Diagnostic</RouterLink></li>}

        <li>{props.arena ? <RouterLink onClick={props.forceRender}> <b>Practice</b></RouterLink> : <Link smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} to="explore">Practice</Link>} </li>

        {(!props.arena || !props.userName) && <li><RouterLink to={{
          pathname: '/login',
          state: { to: props.location.pathname }
        }} className="login" activeClass="active" offset={-70}
          duration={500} >Login</RouterLink></li>}



        {!props.arena && <li><Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} >About</Link></li>}

        {(props.arena && props.userName) && <li><Link style={{
          textAlign: 'center',
          marginTop: '5px'
        }} activeClass="active" offset={-70}
          duration={500} > <Icon className={classes.userIcon}>account_circle</Icon></Link></li>}
        {(props.arena && props.userName) && <li><Link activeClass="active" offset={-70}
          duration={500} > <span> {props.userName} </span> </Link></li>}

        {!props.arena && <li><Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500}>Contact</Link></li>}

        {!props.arena && <li><Link to="discover" smooth={true} spy={true} className="sign-up" activeClass="active" offset={-70}
          duration={500}>Get Started</Link></li>}
      </ul>
    </nav>
  );
}

const NavWithRouter = withRouter((props) => <Nav {...props} />)

export default NavWithRouter;
