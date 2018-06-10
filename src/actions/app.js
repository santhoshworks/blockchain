import { APP_LOAD, LOAD_BLOCKS, UPDATE_SELECTEDBLOCK } from 'constants/action-types';

export function loadApp() {
  return {
    type: APP_LOAD,
  };
}

export function loadTransactions(blocks) {
  return {
    type: LOAD_BLOCKS,
    payload: blocks
  };
}

export function updateSelectedBlock(hash) {
  return {
    type: UPDATE_SELECTEDBLOCK,
    payload: hash
  };
}

export default { loadApp, loadTransactions };
