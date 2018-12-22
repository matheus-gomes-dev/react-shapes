import React, { Component } from 'react';
import { Circle } from 'react-shapes';

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
    console.log('*****');
    console.log(this.state);
    const { points } = this.state;
    if (points.length === 3) {
      return;
    }
    const coordinateX = event.clientX - this.shapesGrid.offsetLeft - offsetX;
    const coordinateY = event.clientY - this.shapesGrid.offsetTop - offsetY;
    console.log('position x: ', coordinateX);
    console.log('position y: ', coordinateY);
    points.push({ coordinateX, coordinateY });
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
        </GridContainer>
      </FlexDiv>
    );
  }
}

export default shapesGrid;
