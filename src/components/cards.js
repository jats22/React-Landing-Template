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
import { green, grey, red,blue,deepPurple} from '@material-ui/core/colors';
import Phone from '@material-ui/icons/Phone';
import Map from '@material-ui/icons/Map';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import CardImage from '../images/analog.png';
import Card1Image from '../images/digital.jpg';
import Card2Image from '../images/circuit.gif';
import FlagIcon from '@material-ui/icons/Flag';
import Rating from '@material-ui/lab/Rating';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
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
    color:'#5c10e4',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: deepPurple[300],
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
  report:{
    color : grey[500],
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


const StyledRating = withStyles({
  iconFilled: {
    color: '#8d52f8',
  },
})(Rating);


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [upvote, setUpvote] = React.useState(true);
  const [downvote, setDownvote] = React.useState(true);
  const images = [CardImage,Card1Image,Card2Image];

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleUpvote(){
    setUpvote(!upvote)
  }

  function handleDownvote(){
    setDownvote(!downvote)
  }

  function toTitleCase(str){
    return str.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
   }

  function handleDirection(){
    
    var latDes = 12.9113413 ,longDes = 77.6772604
    var url = "https://www.google.com/maps/dir/?api=1";
    var origin = "&origin=" + props.location.lat + "," + props.location.long;
    var destination = "&destination=" + latDes + "," + longDes;
    var newUrl = new URL(url + origin + destination);
    window.open(newUrl, "_blank")
  }

  return (
    <Card className={classes.card}>

      <CardHeader
        avatar={
          <div>
          {/* <Avatar aria-label="recipe" className={classes.avatar}>
            { (props.subheader[0].charCodeAt(0) % 10)} km
          </Avatar> */}
          <LockOpenIcon fontSize="large"/>
          </div>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={toTitleCase(props.title)}
        titleTypographyProps={{variant:'h6' }}
        // subheader={props.subheader}
      />
      <CardMedia
        className={classes.media}
        image={ images[props.index]}
        title="Paella dish"
      />
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content || <div>This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.</div>}
          
        </Typography>
      </CardContent> */}
      <CardActions>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <Button size="small" color="inherit" 
          className={clsx(classes.report)}
        >
          <FlagIcon fontSize="small"/> 
          Report
        </Button> */}
        {/* <StyledRating value={(props.subheader[0].charCodeAt(0) % 10)} readOnly  size="small"  /> */}
        <div>
        <Tooltip enterDelay={1000000000000} TransitionComponent={Zoom}  title="Explore" placement="bottom" >
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="Explore"
            onClick={handleExpandClick}
          >
            
              <ExpandMoreIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
        </div>

        {/* <IconButton onClick={handleDirection}>
            <Map/>
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          {/* <Typography paragraph><Phone/> Contact Details:</Typography>
          <Typography paragraph>
            Phone no: +919994362189
          </Typography>
          <Typography paragraph><Map/> Directions:</Typography>
          <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut odio auctor, semper lacus et, finibus odio.
          </Typography> */}
          <List component="div" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemText primary=" Number Systems" />
              <LockOpenIcon/>
              <ListItemIcon>
                <StyledRating value={2} readOnly  size="small"  />
              </ListItemIcon>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Memory And Programmable Logic " />
              <LockIcon/>
              <ListItemIcon>
                <StyledRating value={2} readOnly  size="small"  />
              </ListItemIcon>
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}