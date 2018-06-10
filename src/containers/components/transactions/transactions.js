import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RECORDS_PER_PAGE = 50;
export class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.displayTransactions = this.displayTransactions.bind(this);
  }

  displayTransactions() {
    const transactions = this.props.transactions;
    if (transactions) {
      const currentPage = this.state.currentPage;
      const start = (currentPage + 1) * RECORDS_PER_PAGE;
      let page = null;
      if (transactions[start]) {
        page = [];
        for (let i = start; i < start + RECORDS_PER_PAGE; i += 1) {
          const currTxn = transactions[i];
          if (!currTxn) {
            break;
          }
          page.push((
            <tr>
              <td>Index: {currTxn.tx_index}</td>
              <td>Size: {currTxn.size}</td>
              <td>Ver: {currTxn.ver}</td>
              <td>Weight : {currTxn.weight}</td>
            </tr>));
        }
      }

      const tableRows = (
        <table>
          <tbody>
            {page}
          </tbody>
        </table>
      );
      return (<div ><div>Showing 50 records per Page</div>{tableRows}</div>);
    }
    return null;
  }

  render() {
    if (!this.props.transactions) {
      return null;
    }

    return (
      <div className={''} >
        <div className={'transactions'}>
          {this.displayTransactions()}
        </div>
      </div>
    );
  }
}

Transactions.defaultProps = {
  transactions: null
};

Transactions.propTypes = {
  transactions: PropTypes.shape
};

export default Transactions;
