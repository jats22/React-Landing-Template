import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green, grey, red} from '@material-ui/core/colors';
import Phone from '@material-ui/icons/Phone';
import Map from '@material-ui/icons/Map';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

import CardImage from '../images/food.jpg';

const useStyles = makeStyles(theme => ({
  card: {
    width: 325,
    '&:hover': {
      boxShadow: '0px 1px 15px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    }

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    'max-width': '90%',
    margin: '0 auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
    fontWeight : 800,
    fontSize : 'x-small',
  },
  upvote:{
    color : green[400],
  },
  upvoteRevert:{
    color : grey[700],
  },
  downvote:{
    color : red[400],
  },
  downvoteRevert:{
    color : grey[700],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [upvote, setUpvote] = React.useState(true);
  const [downvote, setDownvote] = React.useState(true);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleUpvote(){
    setUpvote(!upvote)
  }

  function handleDownvote(){
    setDownvote(!downvote)
  }


  return (
    <Card className={classes.card}>

      <CardHeader
        avatar={
          <div>
          <Avatar aria-label="recipe" className={classes.avatar}>
            { (props.subheader[0].charCodeAt(0) % 10)} km
          </Avatar>
          </div>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.title}
        subheader={props.subheader}
      />
      <CardMedia
        className={classes.media}
        image={CardImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content || <div>This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.</div>}
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton aria-label="Upvote" 
            onClick={handleUpvote}
            className={clsx(classes.upvote,{[classes.upvoteRevert]:upvote, } ) }
        >
          <ExpandMoreIcon style={{transform: 'rotate(180deg)'}}/>
        </IconButton>
        <IconButton aria-label="Downvote"
                  onClick={handleDownvote}
                  className={clsx(classes.downvote,{[classes.downvoteRevert]:downvote, } ) }
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><Phone/> Contact Details:</Typography>
          <Typography paragraph>
            Phone no: +919994362189
          </Typography>
          <Typography paragraph><Map/> Directions:</Typography>
          <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut odio auctor, semper lacus et, finibus odio.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}