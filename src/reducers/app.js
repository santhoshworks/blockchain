import { APP_LOAD, LOAD_BLOCKS, UPDATE_SELECTEDBLOCK } from 'constants/action-types';
import assign from 'lodash/assign';

const initialState = {
  loaded: false,
  blocks: [],
  selectedHash: ''
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case APP_LOAD:
      return { ...state, loaded: true };
    case LOAD_BLOCKS:
      return assign({}, state, { blocks: action.payload });
    case UPDATE_SELECTEDBLOCK:
      return assign({}, state, { selectedHash: action.payload });
    default:
      return state;
  }
}
