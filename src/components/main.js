import React, { Component } from 'react';
import TopicListing from "./topic-listing";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';
import KeyFeatures from './key-features';
import lpImage1 from '../images/landing-page.png'
import lpImage2 from '../images/landing-page 2.png'


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

        <KeyFeatures />
        <Fade left>
          <section className="intro"  >
            <h2>Solve Real Interview Questions</h2>
            <div>
              <img src={lpImage1}></img>
              <p>
                We provide detailed explainations of real interview technical questions using illustrations and circuits you can play with online!
                </p>
            </div>
          </section>
        </Fade>

        <Fade right>
          <section className="intro">
            <h2>Get the Feedback you need!</h2>
            <div>
              <img src={lpImage2}></img>
              <p>
                Make sure your not so great areas of hardware are not getting rusted. We help you focus on your strengths as well as improve upon your weak spots.
              </p>
            </div>
          </section>
        </Fade>
        <section className="results" id="discover">
          <h2>Practice</h2>
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

        <section id="contact" >
          <h2>Get in touch <i class="fa fa-phone" aria-hidden="true"></i></h2>
          <a className="contact" href="mailto:sandilya.jatin@gmail.com?subject=Circuital : Feedback/Suggestion">Email Us</a>

        </section>

      </main>
    );
  }
}

export default Main;
