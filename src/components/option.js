import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import MarkdownRender  from './common/markdown-render';

const useStyles = makeStyles(theme => ({
  button: {
    "&:hover": {
      backgroundColor: "transparent !important"
    }
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function OptionButton(props) {
  const classes = useStyles();

  return (
    <ListItem button divider autoFocus={true} onClick={props.onClick} disabled={props.disabled} className={props.className} >
      {/* <div dangerouslySetInnerHTML={props.answer} /> */}
      <MarkdownRender source={props.answer}/>
    </ListItem>
  );
}