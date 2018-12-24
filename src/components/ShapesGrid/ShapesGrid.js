import React, { Component } from 'react';
import { Polyline } from 'react-shapes';

import { define4thPoints } from '../../utils/parallelogramDraw';
import { GridContainer, FlexDiv } from './ShapesGridStyles';
import Dot, { offsetX, offsetY } from '../Dot/Point';


class shapesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
    };
    this.shapesGrid = React.createRef();
    this.gridClick = this.gridClick.bind(this);
  }

  gridClick(event) {
    const { points } = this.state;
    if (points.length >= 3) {
      return;
    }
    const coordinateX = event.clientX - this.shapesGrid.offsetLeft - offsetX;
    const coordinateY = event.clientY - this.shapesGrid.offsetTop - offsetY;
    points.push({ coordinateX, coordinateY });
    if (points.length === 3) {
      const P4 = define4thPoints(points[0], points[1], points[2])[0];
      points.push(P4);
    }
    this.setState(prevState => ({ ...prevState, points }));
  }

  render() {
    const { points } = this.state;
    return (
      <FlexDiv>
        <GridContainer
          ref={(elem) => { this.shapesGrid = elem; }}
          onClick={this.gridClick}
        >
          {points.map(point => (
            <Dot coordinateX={point.coordinateX} coordinateY={point.coordinateY} />
          ))}
          {points.length === 4 && (
            <Polyline
              points={`
                ${points[0].coordinateX},${points[0].coordinateY} ${points[1].coordinateX},${points[1].coordinateY} 
                ${points[2].coordinateX},${points[2].coordinateY} ${points[3].coordinateX},${points[3].coordinateY} 
                ${points[0].coordinateX},${points[0].coordinateY}
              `}
              fill={{ color: 'transparent' }}
              stroke={{ color: '#E65243' }}
              strokeWidth={3}
            />
          )}
        </GridContainer>
      </FlexDiv>
    );
  }
}

export default shapesGrid;
