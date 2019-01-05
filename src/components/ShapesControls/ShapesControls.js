import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ControlsDiv from './ShapesControlsStyle';
import changeMode from './shapesControlsActions';

const ShapesControls = (props) => {
  const { points, mode, switchMode } = props;
  return (
    <div style={{ height: '50px' }}>
      { points.length === 4 && (
        <ControlsDiv>
          <button
            className="btn btn-primary"
            disabled={points.length !== 4 || mode === 'move'}
            title="Move shape mode"
            type="button"
            onClick={() => switchMode('move')}
          >
            <span
              className="glyphicon glyphicon-move"
              aria-hidden="true"
            />
          </button>
          <button
            className="btn btn-primary"
            disabled={points.length !== 4 || mode === 'change'}
            title="Change shape mode"
            type="button"
            onClick={() => switchMode('change')}
          >
            <span
              className="glyphicon glyphicon-resize-full"
              aria-hidden="true"
            />
          </button>
        </ControlsDiv>
      )}
    </div>
  );
};

ShapesControls.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object),
  switchMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

ShapesControls.defaultProps = {
  points: [],
};

const mapStateToProps = state => ({
  points: state.selectedPoints.points,
  mode: state.shapesControlMode.mode,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  switchMode: changeMode,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShapesControls);
