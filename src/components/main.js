import React, { Component } from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';
import KeyFeatures from './key-features';
import lpImage1 from '../images/landing-page.png'
import lpImage2 from '../images/landing-page 2.png'
import lpImage3 from '../images/tick.gif'
import AuthDecorator from './auth';

import { Link } from 'react-router-dom';


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

        <section className="results" id="discover">
          <h1 className="assessment" style={{ marginBottom: '20px',padding: '15px',textAlign: 'center'}}>Take the quick diagnostic test to know where you stand.</h1>
          {/* <h1 style={{ margin: '10px auto',textAlign: 'center',padding: '15px' }}> Take the quick diagnostic test to get started and know where you stand.</h1> */}

          <div>
            <div className="signin"><Link  to={{
                    pathname: '/login',
                    state: { to : '/arena?quizId=33103eea76083afe55b7'}
                    }} className="locateme">Take Assessment</Link></div>
            {/* <AuthDecorator isAuthenticated={this.props.isAuthenticated} signIn={this.props.signIn} showAuth={this.props.showAuth} /> */}
            <br />
            <br />
          </div>

        </section>

        <section className="intro"  >
          <h2>Solve Real Interview Questions</h2>
          <Fade right>
            <div>
              <img src={lpImage1}></img>
              <p>
                We provide detailed explanations of real interview technical questions using illustrations and circuits you can play with online!
                </p>
            </div>
          </Fade>
        </section>

        <section className="feedback">
        <h2>Get the feedback you need!</h2>
          <Fade right>
            <div>
              <img src={lpImage2}></img>
              <p>
                Obtain detailed explanations to hardware interview questions that include engaging illustrations and a circuit simulator that you can play with to really ensure that you're able to ace your fundamentals.
              </p>
            </div>
          </Fade>
        </section>


        <section className="intro">
          <h2>Get hired.</h2>
            <div style={{textAlign:'center'} }>
              <img style={{maxWidth: '200px'}} src={lpImage3}></img>
              <p style={{    textAlign: 'left'}}>
                We help you focus on your strengths and make sure you avoid any blind spots in the process just so you can nail your dream hardware job! Our goal is to help you get through to the hardware companies that are on the lookout for you.<br /><br />
              </p>
            </div>
        </section>

        <section className="results"  id="explore">
          <div style={{ textAlign: 'center', fontSize: 'larger' }}>
            <h1><Link className="locateme" onClick={ ()=> {  window.analytics.track("User Clicked on Explore Quizzes");} } to={{
              pathname: '/arena'
            }}>
              Explore Quizzes
                            </Link>
            </h1>
          </div>
        </section>

        <section className="intro" id="about" style={{marginBottom: '130px'}}>
          <h2>About Us</h2>
          <div>
            <p>
            We help aspiring hardware engineers work through engaging problems and structured prep that helps them develop an intuition for hardware. Build analogies and visualizations for foundational concepts required to get you ready.
            </p>
          </div>
        </section>

        <section id="contact" >
          <a className="contact" href="mailto:team@circuit.al?subject=Circuital : Feedback/Suggestion"> Get in touch</a>

        </section>

      </main>
    );
  }
}

export default Main;
