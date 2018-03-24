// ====================================================================================================
// [AppContainer]
// ====================================================================================================
import React from 'react';
import { connect } from 'react-redux';
import { AppPanel } from '../components/AppPanel';

// ----------------------------------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => {
  return state.app;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /*
    onClick: () => {
      // [TODO] handle editor ui ...
      dispatch(setVisibilityFilter(ownProps.filter))
    }
    */
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPanel);

export default AppContainer;
