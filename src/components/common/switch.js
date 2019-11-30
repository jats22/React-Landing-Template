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
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (name,next) => (event) => {
    setState({ ...state, [name]: event.target.checked });
    next(event.target.checked);
  };

  return (
    <div style={{    margin: 'auto'}}>
      <RedSwitch
        checked={state.checkedA}
        onChange={handleChange('checkedA',props.handleChange) }
        value="checkedA"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </div>
    )
}