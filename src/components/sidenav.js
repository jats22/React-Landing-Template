import React, { useState, Fragment } from 'react';

import { Link } from "react-scroll";


function SideNav() {


    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }


    return (
        <Fragment>
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <Link to="discover" smooth={true} spy={true} activeClass="active" offset={-70}
                    duration={500} onClick={closeNav} >Discover</Link>
                <Link to="about" smooth={true} spy={true} activeClass="active" offset={-70}
                    duration={500} onClick={closeNav} >About</Link>
                <Link to="contact" smooth={true} spy={true} activeClass="active" offset={-70}
                    duration={500} onClick={closeNav}>Contact</Link>
            </div>
        </Fragment>
    );
}



export default SideNav;
