import { SHOW_VALUES, SET_PERCENT_CHANGE_VALUES } from './action-types';

export function showValues(payload) {
  return {
    type: SHOW_VALUES,
    payload
  }
}

export function setPercentChangeValues(payload) {
  return {
    type: SET_PERCENT_CHANGE_VALUES, 
    payload
  }
}