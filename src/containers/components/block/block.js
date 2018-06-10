import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBlockById } from 'services/blockchainapi';
import PropTypes from 'prop-types';
import TransactionTable from '../transactions/transactions';

export class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockInfo: null
    };
    this.displayBlock = this.displayBlock.bind(this);
  }
  componentDidMount() {
    getBlockById(this.props.selectedHash)
      .then((res) => { this.setState({ blockInfo: res.data }); });
  }

  displayBlock() {
    const blockInfo = this.state.blockInfo;
    if (blockInfo) {
      const tableRows = (
        <table>
          <tbody>
            <tr>
              <td>Block Index : {blockInfo.block_index}</td>
              <td>Fee : {blockInfo.fee}</td>
              <td>Bits : {blockInfo.bits}</td>
            </tr>
            <tr>
              <td>Hash : {blockInfo.hash}</td>
              <td>height : {blockInfo.height}</td>
              <td>Nonce : {blockInfo.nonce}</td>
            </tr>
            <tr>
              <td>Prev Block : {blockInfo.prev_block}</td>
              <td>Received Time : {blockInfo.received_time}</td>
              <td>Size : {blockInfo.size}</td>
            </tr>

          </tbody>
        </table>
      );
      return (<div >{tableRows}</div>);
    }
    return null;
  }

  render() {
    if (!this.props.selectedHash) {
      return null;
    }

    return (
      <div className={''} >
        <header>
          <h1>BlockChain Transactions</h1>
        </header>
        <div className={'transactions'}>
          {this.displayBlock()}
          <TransactionTable transactions={this.state.blockInfo ? this.state.blockInfo.tx : null} />
        </div>
      </div>
    );
  }
}

Block.defaultProps = {
  selectedHash: ''
  // dispatch: () => {}
};

Block.propTypes = {
  selectedHash: PropTypes.string,
  // dispatch: PropTypes.func
};

function mapStateToProperties(state) {
  return {
    selectedHash: state.app.selectedHash
  };
}

export default connect(mapStateToProperties)(Block);
