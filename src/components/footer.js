import React, { Component } from 'react';


class Footer extends Component {
  render() {
    return (

      <footer>
        <h3>&copy; Circuit.al</h3>
        <ul>
          <li>FAQ</li>
          <li>Privacy Policy</li>
          <li>Terms of use</li>
          <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
        </ul>
      </footer>

    );
  }
}

export default Footer;
