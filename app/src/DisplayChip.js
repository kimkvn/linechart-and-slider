import React from 'react';
import { connect } from 'react-redux';

export const DisplayChip = props => {
  const style = {
    boxShadow: `${props.color} 4px 0px 0px 0px inset`
  };

  const isPos = props.percentChange > 0 ? '+' : '';
  const value = Math.round(props.percentChange * 100) / 100;

  return (
    <div className="displayChip" style={style}>
      <span className="displayChipLabel">{props.label}</span>
      {props.showValues ? (
        <span className="displayChipValue">
          {isPos}
          {value}%
        </span>
      ) : null}
    </div>
  );
};

export const mapStateToProps = (store, selfProps) => {
  const percentChangeValues = store.percentChangeValues;
  const comparator = percentChangeValues
    ? percentChangeValues.find(comparator => comparator.id === selfProps.id)
    : null;
  const percentChange = comparator ? comparator.percentChange : '--';
  return {
    showValues: store.showValuesFlag,
    percentChange: percentChange
  };
};

export default connect(mapStateToProps)(DisplayChip);
