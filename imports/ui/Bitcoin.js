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
      open: false
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
    this.props.resetLimits()
  };


  componentWillUpdate(nextProps, nextState) {
    if (!this.props.loading) {
      const { percentChange } = this.props.bitcoin;
      const { percentLimit } = nextProps;

      if (Math.abs(percentChange) >= Math.abs(percentLimit) && !this.state.open) {
        this.setState({ open: true });
      }
    }
  }

  render() {
    if (this.props.loading) return (<Loading />)

    const { averagePrice, inputTime, percentChange, price } = this.props.bitcoin;
    const { percentLimit } = this.props
    const movedColor = percentChange > 0 ? 'green' : 'red';

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className='bitcoin-container'>
        <h1>Bitcoin</h1>
        <div className={`info-container ${movedColor}`}>
          <div className='info-item'>
            <div>Price</div>
            <div>{numeral(price).format('$0,0.00')}</div>
          </div>
          <div className='info-item'>
            <div>Avg Price</div>
            <div>{numeral(averagePrice).format('$0,0.00')}</div>
          </div>
          <div className='info-item'>
            <div>Limit Set</div>
            <div>{`${inputTime} mins`}</div>
          </div>
          <div className='info-item'>
            <div>Percent Moved</div>
            <div>{numeral(percentChange).format('0.00%')}</div>
          </div>
        </div>
        <Dialog
          title={`Your ${numeral(percentLimit).format('0.00%')} limit reached!`}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        </Dialog>
      </div>
    )
  }
}

const getBitCoinData = gql`
  query($inputTime: Int!) {
    bitcoin(inputTime: $inputTime) {
      price
      averagePrice
      inputTime
      percentChange
    }
  }
`;

const withData = graphql(getBitCoinData, {
  options: ({ inputTime }) => {
    return ({
    pollInterval: 3000,
    variables: {
      inputTime,
    },
  })},
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
