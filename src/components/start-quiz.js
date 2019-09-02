import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #05bffa 30%, #5b0eea 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(187, 168, 202, 0.3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function StartQuiz(props) {
  const classes = useStyles();
  return <Button className={classes.root}>{props.startQuizBtn}</Button>;
}