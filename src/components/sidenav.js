import React, { useState, Fragment } from 'react';
import useWindowScrollPosition from "@rehooks/window-scroll-position";



function SideNav() {

        
    function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    }


  return (
    <Fragment>
        <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
            <a href="#">Discover</a>
            <a href="#">About</a>
            <a href="#">Mission</a>
            <a href="#">Contact</a>
        </div>
    </Fragment>
  );
}



export default SideNav;
