import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BlackDot, BlackDotBorder } from './PointsStyle';
import { updatePoints } from './pointsActions';

class Points extends Component {
  constructor(props) {
    super(props);
    this.state = { cursor: 'grab' };
  }


  render() {
    const { points } = this.props;
    const { cursor } = this.state;
    return (points.map(point => (
      <BlackDotBorder
        draggable
        style={{ left: point.coordinateX, top: point.coordinateY, cursor }}
        onPointerDown={() => this.setState(() => ({ cursor: 'grabbing' }))}
        onPointerUp={() => this.setState(() => ({ cursor: 'grab' }))}
        onPointerLeave={() => this.setState(() => ({ cursor: 'grab' }))}
        onDragOver={e => e.preventDefault()}
        onDragStart={(e) => {
          e.preventDefault();
          console.log('dragging started!');
          console.log(e.movementX);
        }}
        onDrop={(e) => {
          console.log('drop!');
        }}
      >
        <BlackDot />
      </BlackDotBorder>
    )));
  }
}

Points.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({ points: state.selectedPoints.points });
const mapDispatchToProps = dispatch => bindActionCreators({
  updatePoints,
}, dispatch);

export const offsetX = 8;
export const offsetY = 8;
export default connect(mapStateToProps, mapDispatchToProps)(Points);
