import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastr';
import PropTypes from 'prop-types';

import {
  define4thPoints,
  definePolylineExpression,
  defineCenterOfMass,
  calculateAreaOfParallelogram,
  checkIfPointsAreTooClose,
} from '../../utils/parallelogramDraw';
import { GridContainer, FlexDiv, ActionsDiv } from './ShapesGridStyles';
import Points, { offsetX, offsetY } from '../Points/Points';
import { resetPoints, updatePoints, stoppedMovingPoint } from '../Points/pointsActions';
import Display from '../Display/Display';

const limitX = 785;
const limitY = 485;
const checkBoundaries = (point) => {
  let anwser = true;
  if (point.coordinateX > limitX || point.coordinateX < 0
  || point.coordinateY > limitY || point.coordinateY < 0) {
    anwser = false;
  }
  return anwser;
};

class shapesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      centerOfMass: null,
      area: null,
      resultsFor4thPoint: [],
    };
    this.shapesGrid = React.createRef();
    this.toastr = React.createRef();
    this.gridClick = this.gridClick.bind(this);
    this.clearPoints = this.clearPoints.bind(this);
    this.adjustCenterOfMass = this.adjustCenterOfMass.bind(this);
    this.movingMouseOverGrid = this.movingMouseOverGrid.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
    this.shuffleParallelogram = this.shuffleParallelogram.bind(this);
    this.check4thPoints = this.check4thPoints.bind(this);
  }

  gridClick(event) {
    const { points, updatePoints: setNewPoints, isMoving } = this.props;
    const copyOfPoints = [...points];
    if (isMoving.initialCoordinates) {
      this.stopMoving();
      return;
    }
    if (points.length >= 3) {
      return;
    }
    const coordinateX = event.pageX - this.shapesGrid.offsetLeft - offsetX;
    const coordinateY = event.pageY - this.shapesGrid.offsetTop - offsetY;
    if (!checkBoundaries({ coordinateX, coordinateY })) {
      this.toastr.warning('Please choose another point', 'Out of boundaries', {
        closeButton: true,
      });
      return;
    }
    copyOfPoints.push({ coordinateX, coordinateY });
    if (checkIfPointsAreTooClose(copyOfPoints)) {
      this.toastr.warning('There is a pair of points too close to each other!', 'Points too close', {
        closeButton: true,
      });
      return;
    }
    let area = null;
    let resultsFor4thPoint = [];
    let centerOfMass = null;
    if (copyOfPoints.length === 3) {
      resultsFor4thPoint = this.check4thPoints(copyOfPoints);
      if (!resultsFor4thPoint.length) {
        return;
      }
      const P4 = resultsFor4thPoint[0];
      copyOfPoints.push(P4);
      area = calculateAreaOfParallelogram(
        copyOfPoints[0],
        copyOfPoints[1],
        copyOfPoints[2],
        copyOfPoints[3]
      );
      centerOfMass = defineCenterOfMass(
        copyOfPoints[0],
        copyOfPoints[1],
        copyOfPoints[2],
        copyOfPoints[3]
      );
    }
    setNewPoints(copyOfPoints);
    this.setState(prevState => ({
      ...prevState,
      area,
      resultsFor4thPoint,
      centerOfMass,
    }));
  }

  check4thPoints(points) {
    let resultsFor4thPoint = define4thPoints(points[0], points[1], points[2]);
    resultsFor4thPoint = resultsFor4thPoint.filter(point => checkBoundaries(point));
    if (!resultsFor4thPoint.length) {
      this.toastr.warning(
        'It is impossible to form any parallelogram within the box boundaries, with these points!',
        'Bad combination of points',
        { closeButton: true }
      );
    }
    return resultsFor4thPoint;
  }

  shuffleParallelogram() {
    return null;
  }

  movingMouseOverGrid(event) {
    const { isMoving, points, updatePoints: setNewPoints } = this.props;
    const { centerOfMass } = this.state;
    if (!isMoving.initialCoordinates) {
      return;
    }
    let copyOfPoints = [...points];
    copyOfPoints = copyOfPoints.map((point) => {
      const coordinateX = point.coordinateX + event.movementX;
      const coordinateY = point.coordinateY + event.movementY;
      return { coordinateX, coordinateY };
    });
    let willSetNewPoints = true;
    copyOfPoints.forEach((point) => {
      if (!checkBoundaries(point)) {
        willSetNewPoints = false;
      }
    });
    if (!willSetNewPoints) {
      this.stopMoving();
      return;
    }
    setNewPoints(copyOfPoints);
    const resultsFor4thPoint = this.check4thPoints(copyOfPoints);
    const newCenterOfMass = {
      coordinateX: centerOfMass.coordinateX + event.movementX,
      coordinateY: centerOfMass.coordinateY + event.movementY,
    };
    this.setState(prevState => ({
      ...prevState,
      centerOfMass: newCenterOfMass,
      resultsFor4thPoint
    }));
  }

  stopMoving() {
    const { stoppedMovingPoint: stopMove } = this.props;
    stopMove();
  }

  adjustCenterOfMass() {
    const { centerOfMass } = this.state;
    const horizontalOffset = 4;
    const verticalOffset = 5;
    return [
      centerOfMass.coordinateX + horizontalOffset,
      centerOfMass.coordinateY + verticalOffset,
    ];
  }

  clearPoints() {
    const { resetPoints: clearPoints } = this.props;
    clearPoints();
    this.setState(() => ({
      points: [],
      centerOfMass: null,
      area: null,
      resultsFor4thPoint: [],
    }));
  }

  render() {
    const { area, centerOfMass } = this.state;
    const { points } = this.props;
    const circleRadius = area ? Math.sqrt(area / Math.PI) : 0;
    return (
      <div>
        <ToastContainer
          ref={(elem) => { this.toastr = elem; }}
          className="toast-top-right"
        />
        <Display points={points} area={area} />
        <FlexDiv>
          <GridContainer
            ref={(elem) => { this.shapesGrid = elem; }}
            onClick={this.gridClick}
            onMouseMove={this.movingMouseOverGrid}
          >
            <Points />
            {points.length === 4 && centerOfMass && area && (
              <div>
                <svg height={490} width={790}>
                  <polyline
                    points={definePolylineExpression(points[0], points[1], points[2], points[3])}
                    stroke="blue"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx={this.adjustCenterOfMass()[0]}
                    cy={this.adjustCenterOfMass()[1]}
                    r={circleRadius}
                    stroke="yellow"
                    strokeWidth="3"
                    fill="transparent"
                  />
                </svg>
              </div>
            )}
          </GridContainer>
        </FlexDiv>
        <ActionsDiv>
          <button
            type="button"
            className="btn btn-warning"
            disabled={points.length !== 4}
            onClick={() => this.shuffleParallelogram()}
          >
            SHUFFLE
          </button>
          <br />
          <button
            type="button"
            className="btn btn-info"
            disabled={!points.length}
            onClick={() => this.clearPoints()}
          >
            RESET
          </button>
        </ActionsDiv>
      </div>
    );
  }
}

shapesGrid.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object),
  updatePoints: PropTypes.func.isRequired,
  resetPoints: PropTypes.func.isRequired,
  stoppedMovingPoint: PropTypes.func.isRequired,
  isMoving: PropTypes.object,
};

shapesGrid.defaultProps = {
  points: [],
  isMoving: {},
};

const mapStateToProps = state => ({
  points: state.selectedPoints.points,
  isMoving: state.selectedPoints.moving,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  resetPoints,
  updatePoints,
  stoppedMovingPoint,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(shapesGrid);
