import React from 'react';


const msToTime = (duration) => {
    // duration = duration * 1000;
  
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    
    if(hours == 0.0){
      hours =  ""; 
    } 
    else {
      hours = ((hours < 10) ? "0" + hours : hours) + ":";
    }
    
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + minutes + ":" + seconds;
}

export default msToTime;