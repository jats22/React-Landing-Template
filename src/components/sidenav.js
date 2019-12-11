import React, { useState, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Link } from "react-scroll";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Replay from '../assets/replay.svg';
import SectionBreak from './common/section-break';
import msToTime from './common/utils';

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


  const { sections, currentSectionIndex, onSubsectionClick, sectionChange, currentSubsectionIndex } = props;
  // console.log(props);

  return (
    <Fragment>
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        <div className="section-container">
          <div className="section-header">
            {currentSectionIndex > 0 ? <ArrowBackIosIcon onClick={() => sectionChange(currentSectionIndex, -1)}
              style={{ margin: 'auto' }} /> : <div></div>}
            <h2> {sections[currentSectionIndex].sectionDesc}</h2>
            {currentSectionIndex < (sections.length - 1 )? <ArrowForwardIosIcon onClick={() => sectionChange(currentSectionIndex, 1)}
              style={{ margin: 'auto' }} /> : <div></div>}
          </div>
          {sections[currentSectionIndex].section.map((section, index) => {
            return <Fragment>
              <div onClick={() => { 
                onSubsectionClick(section.offSetMicroSeconds);
                closeNav();
                }}
                className={currentSubsectionIndex == index ? "sub-section active" : "sub-section"} >
                <p>{msToTime(section.offSetMicroSeconds * 1000)}</p>
                <p>{section.subSecDesc}</p>
              </div>
              <SectionBreak />
            </Fragment>
          })
          }
        </div>
      </div>
    </Fragment>);
}



export default SideNav;
