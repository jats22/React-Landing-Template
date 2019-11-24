import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class VolumeBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 0.5,
      reverseValue: 8
    }
  }

  handleChange = (value) => {
    const {updateVolume} = this.props;
    this.setState({
      value: value
    })

    updateVolume(value);
  }

  handleChangeReverse = (value) => {
    this.setState({
      reverseValue: value
    })
  }

  render () {
    const { value, reverseValue } = this.state
    return (
      <div className='slider'>
        <div className='slider-group'>
          <div className='slider-vertical'>
            <Slider
              min={0}
              max={1}
              value={value}
              step={0.1}
              tooltip={false}
              orientation='vertical'
              onChange={this.handleChange}
            />

          </div>
        </div>
      </div>
    )
  }
}

export default VolumeBar