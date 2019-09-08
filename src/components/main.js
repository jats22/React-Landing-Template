import React, { Component } from 'react';
import DiscoverResults from "./discover-results";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EventNoteIcon from '@material-ui/icons/EventNote';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

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
          <DiscoverResults isAuthenticated={this.props.isAuthenticated} signIn={this.props.signIn} showAuth={this.props.showAuth} />
        </section>

        <section className="intro" id="about" >
          <h2>About Us</h2>
          <div>
            <p>Finding verified halal restaurants is tough. <b>But we've got you covered!</b> <br /><br />Discover the best halal outlets near you with us. </p>
          </div>
        </section>
        <div>
          <div >
            <Paper className="services" elevation={0} >
              <Card >
                <CardContent>
                  <Typography component="p" className="service-icon"><EventNoteIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="h4" component="h3" className="service-title">Flash Cards</Typography>
                  <Typography component="p">
                    Never forget a concept ever again. Learn from the people that take your interviews.
                </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography component="p" className="service-icon"><BorderColorIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="h4" component="h4" className="service-title">Learn at your own pace </Typography>
                  <Typography component="p">
                    Self paced interactive content, that will enable you to master your foundations giving you access to the best in class jobs and future.
                </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography component="p" className="service-icon"><DeveloperBoardIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="h4" component="h4" className="service-title">Unlimited practice</Typography>
                  <Typography component="p">
                    Our algorithm generates questions on the fly best suited to you, so that you nail a concept.
                </Typography>
                </CardContent>
              </Card>
            </Paper>
          </div>
        </div>


        <section id="contact" >
          <h2>Get in touch &#128071;</h2>
          <a className="contact" href="mailto:sandilya.jatin@gmail.com?subject=Halal Street : Feedback/Suggestion">Email Us</a>

        </section>

      </main>
    );
  }
}

export default Main;
