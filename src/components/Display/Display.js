import React from 'react';
import PropTypes from 'prop-types';
import StyledDisplay from './DisplayStyle';

const Display = (props) => {
  const { points, area, changedMode } = props;
  return (
    <StyledDisplay>
      {!points.length ? 'NO DATA TO SHOW!' : ''}
      {points.map((point, index) => (
        <div key={`display_point_info_${index}`}>
          {`POSITION OF POINT P${index + 1}: (${point.coordinateX},${point.coordinateY})`}
        </div>
      ))}
      {area ? `AREA FOR CIRCLE AND ${changedMode ? 'QUADRILATERAL' : 'PARALLELOGRAM'}: ${area}px²` : ''}
    </StyledDisplay>
  );
};

Display.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object),
  area: PropTypes.number,
  changedMode: PropTypes.bool
};

Display.defaultProps = {
  points: [],
  area: null,
  changedMode: false
};

export default Display;
