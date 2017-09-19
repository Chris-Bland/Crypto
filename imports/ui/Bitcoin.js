import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import numeral from 'numeral';

import Loading from './Loading';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openOne: false,
      openTwo: false
    }

    this.handleOpenOne = this.handleOpenOne.bind(this)
    this.handleCloseOne = this.handleCloseOne.bind(this)

    this.handleOpenTwo = this.handleOpenTwo.bind(this)
    this.handleCloseTwo = this.handleCloseTwo.bind(this)
  }

  handleOpenOne() {
    this.setState({ openOne: true });
  };

  handleCloseOne() {
    this.setState({ openOne: false });
    this.props.resetLimitOne()
  };
  handleOpenTwo() {
    this.setState({ openTwo: true });
  };

  handleCloseTwo() {
    this.setState({ openTwo: false });
    this.props.resetLimitTwo()
  };



  componentWillUpdate(nextProps, nextState) {
    if (!this.props.loading) {
      const { percentChangeOne, percentChangeTwo } = this.props.bitcoin;
      const { percentLimitOne, percentLimitTwo } = nextProps;

      if (Math.abs(percentChangeOne) >= Math.abs(percentLimitOne) && !this.state.openOne) {
        this.setState({ openOne: true });
        console.log("CONDITION ONE MET");
      }
      if (Math.abs(percentChangeTwo) >= Math.abs(percentLimitTwo) && !this.state.openTwo) {
        this.setState({ openTwo: true });
        console.log('CONDITION TWO MET');
      }
    }
  }

  render() {
    if (this.props.loading) return (<Loading />)

    const { averagePrice, inputTimeOne, percentChangeOne, inputTimeTwo, percentChangeTwo, price } = this.props.bitcoin;
    const { percentLimitOne, percentLimitTwo } = this.props
    const movedColor = percentChangeOne > 0 ? 'green' : 'red';

    const actionsOne = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleCloseOne}
      />,
    ];
    const actionsTwo = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleCloseTwo}
      />,
    ];

    return (
      <div className='bitcoin-container'>
        <div className="header">
          <img className="btcGif" src="./btc.gif" alt="Bitcoin"  />
          <h1>Bitcoin</h1>
          <img className="btcGif" src="./btc.gif" alt="Bitcoin"  />
        </div>
        <div className={`info-container ${movedColor}`}>
          <div className='info-item'>
            <div>Price</div>
            <div>{numeral(price).format('$0,0.00')}</div>
          </div>
          <div className='info-item'>
            <div>Avg Price (60MINS)</div>
            <div>{numeral(averagePrice).format('$0,0.00')}</div>
          </div>
          {/* <div className='info-item'>
            <div>Limit Set</div>
            <div>{`${inputTimeOne} mins`}</div>
          </div> */}
          {/* <div className='info-item'>
            <div>Percent Moved</div>
            <div>{numeral(percentChangeOne).format('0.00%')}</div>
          </div> */}
        </div>
        <Dialog
          title={`Condition One Has Met, BTC moved greater than: ${numeral(percentLimitOne).format('0.00%')}`}
          actions={actionsOne}
          modal={true}
          open={this.state.openOne}
        >
        </Dialog>
        <Dialog
          title={`Condition Two Has Met, BTC moved greater than: ${numeral(percentLimitTwo).format('0.00%')}`}
          actions={actionsTwo}
          modal={true}
          open={this.state.openTwo}
        >
        </Dialog>
      </div>
    )
  }
}

const getBitCoinData = gql`
  query($inputTimeOne: Int!, $inputTimeTwo: Int!) {
    bitcoin(inputTimeOne: $inputTimeOne, inputTimeTwo: $inputTimeTwo) {
      price
      averagePrice
      inputTimeOne
      inputTimeTwo
      percentChangeOne
      percentChangeTwo
    }
  }
`;

const withData = graphql(getBitCoinData, {
  options: ({ inputTimeOne, inputTimeTwo }) => {
    return ({
      pollInterval: 3000,
      variables: {
        inputTimeOne,
        inputTimeTwo
      },
    })
  },
  props: ({ data: { bitcoin, error, loading, refetch } }) => {
    return {
      bitcoin,
      refetch,
      loading,
      error
    };
  },
});

export default withData(App);
