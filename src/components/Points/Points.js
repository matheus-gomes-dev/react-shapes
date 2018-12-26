import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BlackDot, BlackDotBorder } from './PointsStyle';
import { updatePoints, startedMovingPoint } from './pointsActions';

class Points extends Component {
  constructor(props) {
    super(props);
    this.willMovePoint = this.willMovePoint.bind(this);
    this.defineCursorType = this.defineCursorType.bind(this);
  }

  willMovePoint(index) {
    const {
      points,
      isMoving,
      startedMovingPoint: pointWillMove,
    } = this.props;
    if (points.length !== 4 || isMoving.initialCoordinates) {
      return;
    }
    pointWillMove({ index, initialCoordinates: points[index] });
  }

  defineCursorType() {
    const { points, isMoving } = this.props;
    if (points.length !== 4) {
      return '';
    }
    if (isMoving.initialCoordinates) {
      return 'grabbing';
    }
    return 'grab';
  }

  render() {
    const { points } = this.props;
    return (points.map((point, index) => (
      <BlackDotBorder
        draggable
        key={`point_${index}`}
        style={{
          left: point.coordinateX,
          top: point.coordinateY,
          cursor: this.defineCursorType()
        }}
        onClick={() => this.willMovePoint(index)}
      >
        <BlackDot />
      </BlackDotBorder>
    )));
  }
}

Points.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  startedMovingPoint: PropTypes.func.isRequired,
  isMoving: PropTypes.object,
};


Points.defaultProps = {
  isMoving: {},
};

const mapStateToProps = state => ({
  points: state.selectedPoints.points,
  isMoving: state.selectedPoints.moving,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  updatePoints,
  startedMovingPoint,
}, dispatch);

export const offsetX = 8;
export const offsetY = 8;
export default connect(mapStateToProps, mapDispatchToProps)(Points);
