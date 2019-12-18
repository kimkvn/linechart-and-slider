import { SHOW_VALUES } from './action-types';

export function showValues(payload) {
  return {
    type: SHOW_VALUES,
    payload
  }
}