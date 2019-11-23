import React, { useState, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-scroll";
import { Link as RouterLink, withRouter } from 'react-router-dom';

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
        {props.arena && <div>&nbsp;</div>}
        {props.arena && <div>&nbsp;</div>}
        
        {(props.arena && !props.takenDiagnostic) && <RouterLink to={{
          pathname: '/login',
          state: { to: '/arena?quizId=33103eea76083afe55b7' }

        }} className="sign-up" activeClass="active" offset={-70}
          duration={500} >Diagnostic</RouterLink>}

        {props.arena ? <RouterLink onClick={ () => { props.forceRender(); closeNav();} }> <b>Practice</b></RouterLink> : <Link smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} to="explore" onClick={closeNav} >Practice</Link>} 

        {(!props.arena || !props.userName) && <RouterLink to={{
          pathname: '/login',
          state: { to: props.location.pathname }
        }} className="login" activeClass="active" offset={-70}
          duration={500} >Login</RouterLink>}



        {!props.arena && <Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} onClick={closeNav} >About</Link>}

        {(props.arena && props.userName) && <Link style={{
          textAlign: 'center',
          marginTop: '5px'
        }} activeClass="active" offset={-70}
          duration={500} > <Icon className={classes.userIcon}>account_circle</Icon></Link>}
        {(props.arena && props.userName) && <Link activeClass="active" offset={-70}
          duration={500} > <span> {props.userName} </span> </Link>}

        {!props.arena && <Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
          duration={500} onClick={closeNav} >Contact</Link>}

        {!props.arena && <Link to="discover" smooth={true} spy={true} className="sign-up" activeClass="active" offset={-70}
          duration={500} onClick={closeNav} >Get Started</Link>}
            </div>
        </Fragment>
    );
}



export default SideNav;
