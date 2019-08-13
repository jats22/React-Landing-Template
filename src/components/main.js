import React, { Component } from 'react';
import DiscoverResults from "./discover-results";

class Main extends Component {
  render() {
    return (
      <main>

        <section className="results" id="discover">
          <h2>Discover</h2>
          <DiscoverResults/>
        </section>

        <section className="intro" id="about" >
          <h2>About Us</h2>
          <div>
            <p>Finding verfied halal restaurants is tough. <b>But we've got you covered!</b> <br/><br/>Discover the best halal outlets near you with us. </p>
          </div>
        </section>


        <section id="contact" >
          <h2>Get in touch &#128071;</h2>
          <a className="contact" href="mailto:sandilya.jatin@gmail.com?subject=Halal Street : Feedback/Suggestion">Email Us</a> 

        </section>

      </main>
    );
  }
}

export default Main;
