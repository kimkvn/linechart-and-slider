import React from 'react';
import { connect } from 'react-redux';

export const DisplayChip = props => {
  const style = {
    boxShadow: `${props.color} 4px 0px 0px 0px inset`
  };
  return (
    <div className="displayChip" style={style}>
      <span className="displayChipLabel">{props.label}</span>
      {props.showValues ? <span className="displayChipValue">+100</span> : null}
    </div>
  );
};

export const mapStateToProps = store => {
  return {
    showValues: store.showValuesFlag
  };
};

export default connect(mapStateToProps)(DisplayChip);
