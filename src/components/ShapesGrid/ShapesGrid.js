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
import { resetPoints, updatePoints } from '../Points/pointsActions';
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
  }

  gridClick(event) {
    const { points, updatePoints: setNewPoints } = this.props;
    const copyOfPoints = [...points];
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
      resultsFor4thPoint = define4thPoints(copyOfPoints[0], copyOfPoints[1], copyOfPoints[2]);
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
          {/* <button type="button" className="btn btn-warning">SHUFFLE</button>
          <br /> */}
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
};

shapesGrid.defaultProps = {
  points: [],
};

const mapStateToProps = state => ({ points: state.selectedPoints.points });
const mapDispatchToProps = dispatch => bindActionCreators({
  resetPoints,
  updatePoints,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(shapesGrid);
