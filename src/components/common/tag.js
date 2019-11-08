import React from 'react';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        font:'inherit',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

export default function Tag(props) {
    const classes = useStyles();
    return <Chip
        {...props}
        label={props.label}
        className={classes.chip}
        component={props.component}
        avatar={
            props.avatar && 
            <Avatar alt={props.avatar.alt} src={props.avatar.img} />
        }
    />
}