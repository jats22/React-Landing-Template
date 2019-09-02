import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    float:'left',
  },
  nextIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function NextQuestion(props) {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={props.onClick}>
        {props.children}
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        <Icon className={classes.nextIcon}>keyboard_arrow_right</Icon>
      </Button>
    </div>
  );
}