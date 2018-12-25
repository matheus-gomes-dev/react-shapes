import React, { Component } from 'react';
import { Polyline } from 'react-shapes';

import {
  define4thPoints,
  definePolylineExpression,
  defineCenterOfMass,
  calculateAreaOfParallelogram,
} from '../../utils/parallelogramDraw';
import { GridContainer, FlexDiv } from './ShapesGridStyles';
import Dot, { offsetX, offsetY } from '../Dot/Point';
import Display from '../Display/Display';


class shapesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      centerOfMass: null,
      area: null,
    };
    this.shapesGrid = React.createRef();
    this.gridClick = this.gridClick.bind(this);
  }

  gridClick(event) {
    const { points } = this.state;
    if (points.length >= 3) {
      return;
    }
    const coordinateX = event.pageX - this.shapesGrid.offsetLeft - offsetX;
    const coordinateY = event.pageY - this.shapesGrid.offsetTop - offsetY;
    points.push({ coordinateX, coordinateY });
    let area = null;
    if (points.length === 3) {
      const P4 = define4thPoints(points[0], points[1], points[2])[0];
      points.push(P4);
      area = calculateAreaOfParallelogram(points[0], points[1], points[2], points[3]);
    }
    this.setState(prevState => ({ ...prevState, points, area }));
  }

  render() {
    const { points, area } = this.state;
    return (
      <div>
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
