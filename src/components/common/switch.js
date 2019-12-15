import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const RedSwitch = withStyles({
    switchBase: {
      color: red[300],
      '&$checked': {
        color: red[400],
      },
      '&$checked + $track': {
        backgroundColor: red[400],
      },
    },
    checked: {},
    track: {},
  })(Switch);

export default function SwitchView(props) {
  return (
    <div style={{    margin: 'auto'}}>
      <RedSwitch
        checked={props.SwitchView}
        onChange={props.handleChange}
        value={"checked"}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </div>
    )
}