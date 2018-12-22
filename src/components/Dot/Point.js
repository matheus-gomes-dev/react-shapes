import React from 'react';
import PropTypes from 'prop-types';

import { BlackDot, BlackDotBorder } from './PointStyle';

const Dot = (props) => {
  const { coordinateX, coordinateY } = props;
  return (
    <BlackDotBorder style={{ left: coordinateX, top: coordinateY }}>
      <BlackDot />
    </BlackDotBorder>
  );
};

Dot.propTypes = {
  coordinateX: PropTypes.number,
  coordinateY: PropTypes.number,
};

Dot.defaultProps = {
  coordinateX: 0,
  coordinateY: 0,
};

export default Dot;
export const offsetX = 8;
export const offsetY = 8;
