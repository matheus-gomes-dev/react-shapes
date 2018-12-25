import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BlackDot, BlackDotBorder } from './PointStyle';

class Point extends Component {
  constructor(props) {
    super(props);
    this.state = { cursor: 'grab' };
  }


  render() {
    const { coordinateX, coordinateY } = this.props;
    const { cursor } = this.state;
    return (
      <BlackDotBorder
        draggable
        style={{ left: coordinateX, top: coordinateY, cursor }}
        onPointerDown={() => this.setState(() => ({ cursor: 'grabbing' }))}
        onPointerUp={() => this.setState(() => ({ cursor: 'grab' }))}
        onPointerLeave={() => this.setState(() => ({ cursor: 'grab' }))}
        onDragStart={(e) => {
          e.preventDefault();
          console.log('dragging!');
        }}
      >
        <BlackDot />
      </BlackDotBorder>
    );
  }
}

Point.propTypes = {
  coordinateX: PropTypes.number,
  coordinateY: PropTypes.number,
};

Point.defaultProps = {
  coordinateX: 0,
  coordinateY: 0,
};

export default Point;
export const offsetX = 8;
export const offsetY = 8;
