import { combineReducers } from 'redux';

import { SHOW_VALUES, SET_PERCENT_CHANGE_VALUES } from './action-types';

function showValuesFlag(state = false, action) {
  switch (action.type) {
    case SHOW_VALUES:
      return action.payload;
    default:
      return state;
  }
}

function percentChangeValues(state = [], action) {
  switch (action.type) {
    case SET_PERCENT_CHANGE_VALUES: 
      return action.payload;
    default: 
      return state;
  }
}

export default combineReducers({
  showValuesFlag,
  percentChangeValues
});
