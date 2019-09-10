import React, { Component } from 'react';
import TopicListing from "./topic-listing";
import { createStyles, makeStyles } from '@material-ui/core/styles';

import KeyFeatures from './key-features';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>

 
        <section className="results" id="discover">
          <h2>Learn</h2>
          <TopicListing isAuthenticated={this.props.isAuthenticated} signIn={this.props.signIn} showAuth={this.props.showAuth} />
        </section>

        <section className="intro" id="about" >
          <h2>About Us</h2>
          <div>
            <p>
            We want to build a resource that helps aspiring hardware engineers work through engaging problems and structured prep that helps them develop an intuition for difficult-to-visualize esoteric subject. 
            Build analogies and visualizations for foundational concepts.
            </p>
          </div>
        </section>
        
        <KeyFeatures/>
        <section id="contact" >
          <h2>Get in touch &#128071;</h2>
          <a className="contact" href="mailto:sandilya.jatin@gmail.com?subject=Circuital : Feedback/Suggestion">Email Us</a>

        </section>

      </main>
    );
  }
}

export default Main;
