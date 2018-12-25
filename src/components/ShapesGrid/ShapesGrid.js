import React, { Component } from 'react';
import { Polyline } from 'react-shapes';
import { ToastContainer } from 'react-toastr';

import {
  define4thPoints,
  definePolylineExpression,
  defineCenterOfMass,
  calculateAreaOfParallelogram,
  checkIfPointsAreTooClose,
} from '../../utils/parallelogramDraw';
import { GridContainer, FlexDiv } from './ShapesGridStyles';
import Dot, { offsetX, offsetY } from '../Dot/Point';
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
  }

  gridClick(event) {
    const { points } = this.state;
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
    if (copyOfPoints.length === 3) {
      const P4 = define4thPoints(copyOfPoints[0], copyOfPoints[1], copyOfPoints[2])[0];
      copyOfPoints.push(P4);
      area = calculateAreaOfParallelogram(
        copyOfPoints[0],
        copyOfPoints[1],
        copyOfPoints[2],
        copyOfPoints[3]
      );
    }
    this.setState(prevState => ({ ...prevState, points: copyOfPoints, area }));
  }

  render() {
    const { points, area } = this.state;
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
            {points.map((point, index) => (
              <Dot key={`dot_${index}`} coordinateX={point.coordinateX} coordinateY={point.coordinateY} />
            ))}
            {points.length === 4 && (
              <Polyline
                points={definePolylineExpression(points[0], points[1], points[2], points[3])}
                fill={{ color: 'transparent' }}
                stroke={{ color: 'blue' }}
                strokeWidth={3}
              />
            )}
          </GridContainer>
        </FlexDiv>
      </div>
    );
  }
}

export default shapesGrid;
