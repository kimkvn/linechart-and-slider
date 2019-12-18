import React from 'react';
import { tsPropertySignature } from '@babel/types';

const DisplayChip = props => {
  const style = {
    boxShadow: `${props.color} 4px 0px 0px 0px inset`
  };
  return (
    <div className="displayChip" style={style}>
      <span className="displayChipLabel">{props.label}</span>
      <span className="displayChipValue">+100</span>
    </div>
  );
};

export default DisplayChip;
