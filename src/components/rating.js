import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function RatingSnacker(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  function handleClick() {
    setOpen(true);
  }

  function handleClose(event,reason,rating) {
    if (reason === 'clickaway') {
      return;
    }
    props.captureRating(rating)

    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<HoverRating handleClose={handleClose}/>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ''}>
      <div {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles1 = makeStyles({
  rating1: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export function HoverRating(props) {
  const [value,SetValue] = React.useState(4);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles1();

  return (
    <div>
      <Box component="div" mb={3} borderColor="transparent">
        <Typography component="div"> Rate this question: </Typography>
        <div className={classes.rating1}>
          <Rating
            name="hover-side"
            value={value}
            precision={0.5}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            onChange={ (evt,newValue) => {
              SetValue(newValue);
              props.handleClose(null,null,newValue);
            }}
          />
          <Box ml={3}>{labels[hover !== -1 ? hover : value]}</Box>
        </div>
      </Box>
    </div>
  );
}

