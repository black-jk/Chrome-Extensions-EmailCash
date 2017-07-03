// ====================================================================================================
// [Reducers] [App]
// ====================================================================================================
import * as AppActions from '../constants/actions/app';
import * as AppStatus from '../constants/status/app';

const defaultState = {

};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case AppActions.INIT:
      return {
        ...state,
      };

    case AppActions.START:
      return {
        ...state,
        operatorTitle: action.operator.title,
      };

    case AppActions.ACTION:
      return {
        ...state,
        operatorAction: action.actionTitle,
      };

    default:
      return state;
  }
}

export default app;
