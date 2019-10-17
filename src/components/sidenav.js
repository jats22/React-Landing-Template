import React, { useState, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-scroll";

const useStyles = makeStyles(theme => ({
    userIcon: {
      fontSize: '2.1em',
    },
  }));

function SideNav(props) {


    const classes = useStyles();
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }


    return (
        <Fragment>
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <Link to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
                    duration={500} > <b>Practice</b></Link>
                {props.arena && <Link activeClass="active" offset={-70}
                    duration={500} >Dashboard</Link>}
                <Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
                    duration={500} >About</Link>

                {(props.arena && props.userName) && <Link activeClass="active" offset={-70}
                    duration={500} > <Icon className={classes.userIcon}>account_circle</Icon></Link>}
                {(props.arena && props.userName) && <Link activeClass="active" offset={-70}
                    duration={500} > <span> {props.userName} </span> </Link>}

                {!props.arena && <Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
                    duration={500}>Contact</Link>}

                {(!props.arena || !props.userName) && <Link className="login" activeClass="active" offset={-70}
                    duration={500} >Login</Link>}
                {!props.arena && <Link to="sign-up" smooth={true} spy={true} className="sign-up" activeClass="active" offset={-70}
                    duration={500}><b>Sign Up</b></Link>}
            </div>
        </Fragment>
    );
}



export default SideNav;
