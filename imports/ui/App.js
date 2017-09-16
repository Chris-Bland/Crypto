import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

import Bitcoin from './Bitcoin'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTime: 60,
      percentLimit: 100
    }

    this.setLimits = this.setLimits.bind(this);
    this.resetLimits = this.resetLimits.bind(this);
  }

  setLimits() {
    this.setState({
      inputTime: Number(this.refs.inputTime.getValue()),
      percentLimit: Number(this.refs.percentLimit.getValue()) / 100
    })
  }

  resetLimits() {
    this.setState({
      percentLimit: 100
    })
  }

  render() {
    const { inputTime, percentLimit } = this.state;

    return (
      <div className='app-container'>
       <AppBar
          title="Crypto"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Bitcoin inputTime={inputTime} percentLimit={percentLimit} resetLimits={this.resetLimits} />
        <br />
        <div className='input-container'>
          <TextField
            ref='inputTime'
            defaultValue={inputTime}
            hintText="Period in Minutes"
            floatingLabelText="Period in Minutes"
          />
          <br />
          <TextField
            ref='percentLimit'
            hintText="Percent Limit"
            floatingLabelText="Percent Limit"
          /><br />
          <RaisedButton
            onClick={this.setLimits}
            label="Set"
          />
        </div>
      </div>
    )
  }
}

export default App;
