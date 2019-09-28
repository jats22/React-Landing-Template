import React, { Component } from 'react';
import { Link } from "react-scroll";
import { makeStyles } from '@material-ui/core/styles';
import FireEmoji from "../images/fire5.webp"
import Icon from '@material-ui/core/Icon';

import Nav from "./nav";


const useStyles = makeStyles(theme => ({
  nextIcon: {
    // marginLeft: theme.spacing(1),
    fontSize: '2rem !important',
    paddingLeft: '20%',
    paddingRight:'10px',
    color:'white',
  },
}));

export default function Header(props) {

  const classes = useStyles();

  return (

    <header>
      <Nav />
      <div className="head">
        <h1>Learn Hardware< br /> <span>The Right Way.</span></h1>
        <div>
          <h2>
            <div> <Link className="contact" to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
              duration={500} > <span style={{display:'flex'}}><Icon className={classes.nextIcon}>keyboard_arrow_right</Icon>Get Started</span></Link>
            </div>
          </h2>
        </div>
      </div>

    </header>

  );
}
