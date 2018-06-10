import React, { Component } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { loadApp, loadTransactions, updateSelectedBlock } from 'actions/app';
import { getBlocks } from 'services/blockchainapi';
import PropTypes from 'prop-types';
import styles from './app.css';

export class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: null
    };
    this.displayTransactions = this.displayTransactions.bind(this);
    this.showBlockDetails = this.showBlockDetails.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadApp());
    getBlocks().then((res) => { dispatch(loadTransactions(res.data.blocks)); });
  }
  showBlockDetails(hash) {
    const { history, dispatch } = this.props;
    dispatch(updateSelectedBlock(hash));
    history.push('/block');
  }

  displayTransactions() {
    const blocks = this.props.blocks;
    if (blocks && blocks.length > 1) {
      const headers = Object.keys(blocks[0]);
      const tableHeaders = map(headers, (header, colId) => (<th key={`header-col-${colId}`}>{header}</th>));
      tableHeaders.push(<th>{'Actions'}</th>);
      const tableRows = map(blocks, (transaction, index) => {
        const cols = map(transaction, (value, colId) => <td key={`row-${index}-col-${colId}`}>{value}</td>);
        cols.push(<td><button onClick={() => this.showBlockDetails(transaction.hash)}>{'View Block'}</button></td>);
        return (
          <tr key={`blockid${index}`}>{cols}</tr>
        );
      });
      return (
        <table>
          <thead>
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      );
    }
    return null;
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <div className={styles.container} >
        <header>
          <h1>BlockChain Transactions</h1>
        </header>
        <div className={'blocks'}>
          {this.displayTransactions()}
        </div>
      </div>
    );
  }
}

AppContainer.defaultProps = {
  loaded: false,
  blocks: [],
  dispatch: () => {},
  history: { push: () => {} }
};

AppContainer.propTypes = {
  loaded: PropTypes.bool,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    height: PropTypes.number,
    hash: PropTypes.string,
    time: PropTypes.number,
    main_chain: PropTypes.bool
  })),
  dispatch: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func })
};

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded,
    blocks: state.app.blocks
  };
}

export default connect(mapStateToProperties)(AppContainer);
