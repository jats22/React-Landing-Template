import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EventNoteIcon from '@material-ui/icons/EventNote';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

class KeyFeatures extends Component {

  render() {
    return (
        <div>
          <div >
            <Paper className="services" elevation={0} >
              <Card elevation={0}>
                <CardContent>
                  <Typography component="p" className="service-icon"><EventNoteIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="p" component="p" className="service-title">Flash Cards</Typography>
                  <Typography component="p" className="service-text">
                    Never forget a concept ever again. Learn from the people that take your interviews.
                </Typography>
                </CardContent>
              </Card>
              <Card elevation={0}>
                <CardContent>
                  <Typography component="p" className="service-icon"><BorderColorIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="p" component="p" className="service-title">Learn at your own pace </Typography>
                  <Typography component="p" className="service-text">
                    Self paced interactive content, that will enable you to master your foundations giving you access to the best in class jobs and future.
                </Typography>
                </CardContent>
              </Card>
              <Card elevation={0}>
                <CardContent>
                  <Typography component="p" className="service-icon"><DeveloperBoardIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="p" component="p" className="service-title">Unlimited practice</Typography>
                  <Typography component="p" className="service-text">
                    Our algorithm generates questions on the fly best suited to you, so that you nail a concept.
                </Typography>
                </CardContent>
              </Card>
            </Paper>
          </div>
        </div>

    );
  }
}

export default KeyFeatures;
