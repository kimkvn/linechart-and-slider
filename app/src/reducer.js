import { combineReducers } from 'redux';

import { SHOW_VALUES } from './action-types';

function showValuesFlag(state = false, action) {
  switch (action.type) {
    case SHOW_VALUES:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  showValuesFlag
});
