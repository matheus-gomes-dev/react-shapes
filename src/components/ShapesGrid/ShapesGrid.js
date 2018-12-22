import React, { Component } from 'react';

import { GridContainer, FlexDiv } from './ShapesGridStyles';

class shapesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.gridClick = this.gridClick.bind(this);
  }

  gridClick(event) {
    console.log(event);
  }

  render() {
    return (
      <FlexDiv>
        <GridContainer onClick={this.gridClick} />
      </FlexDiv>
    );
  }
}

export default shapesGrid;
