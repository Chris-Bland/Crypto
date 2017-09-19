import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



import Bitcoin from './Bitcoin'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTimeOne: 60,
      percentLimitOne: 100,
      inputTimeTwo: 5,
      percentLimitTwo: 100,
      completed: 0,
    }

    this.setLimitOne = this.setLimitOne.bind(this);
    this.resetLimitOne = this.resetLimitOne.bind(this);

    this.setLimitTwo = this.setLimitTwo.bind(this);
    this.resetLimitTwo = this.resetLimitTwo.bind(this);
  }

  setLimitOne() {
    this.setState({
      inputTimeOne: Number(this.refs.inputTimeOne.getValue()),
      percentLimitOne: Number(this.refs.percentLimitOne.getValue()) / 100
    })
  }
  setLimitTwo() {
    this.setState({
      inputTimeTwo: Number(this.refs.inputTimeTwo.getValue()),
      percentLimitTwo: Number(this.refs.percentLimitTwo.getValue()) / 100
    })
  }

  resetLimitOne() {
    this.setState({
      percentLimitOne: 100
    })
  }
  resetLimitTwo() {
    this.setState({
      percentLimitTwo: 100
    })
  }



  render() {
    const { inputTimeOne, percentLimitOne, inputTimeTwo, percentLimitTwo } = this.state;
    const style = {
      container: {

      },
      button: {
        margin: 18,
      },
    };

    return (
      <div className='app-container'>
        <AppBar
          title="Crypto"
          style={{backgroundColor: "#1E88E5"}}

          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Bitcoin inputTimeOne={inputTimeOne} percentLimitOne={percentLimitOne} inputTimeTwo={inputTimeTwo} percentLimitTwo={percentLimitTwo} resetLimitOne={this.resetLimitOne} resetLimitTwo={this.resetLimitTwo} />
        <br />
        <div className='input-container'>
          <div className='firstConditional conditionals'>
            <p className="btcText"> If Bitcoin moves greater than </p>
            <div className="inputWrapper">
              <TextField
                style={{ width: 'initial' }}
                ref='percentLimitOne'
                hintText="Percent Limit"
                floatingLabelText="Percent Limit"
              />
            </div>
            <p className="btcText">% in </p>
            <div className="inputWrapper">
              <TextField
                style={{ width: 'initial' }}
                ref='inputTimeOne'
                defaultValue={inputTimeOne}
                hintText="Period in Minutes"
                floatingLabelText="Minutes"
              />
            </div>

            <p className="btcText">minutes, Condition Met.</p>
            <RaisedButton style={style.button} backgroundColor="#1E88E5" onClick={this.setLimitOne}
              label="Set" />

          </div>
          <div className='secondConditional conditionals'>
            <p className="btcText"> If Bitcoin moves greater than </p>
            <div className="inputWrapper">
              <TextField
                style={{ width: 'initial' }}
                ref='percentLimitTwo'
                hintText="Percent Limit"
                floatingLabelText="Percent Limit"
              />
            </div>
            <p className="btcText">% in </p>
            <div className="inputWrapper">
              <TextField
                style={{ width: 'initial' }}
                ref='inputTimeTwo'
                defaultValue={inputTimeTwo}
                hintText="Period in Minutes"
                floatingLabelText="Minutes"
              />
            </div>
            <p className="btcText">minutes, Condition Met.</p>
            <RaisedButton style={style.button} backgroundColor="#1E88E5" onClick={this.setLimitTwo}
              label="Set" />
        



          </div>
        </div>
      </div>
    )
  }
}

export default App;
