import { Action } from '@ngrx/store';
import { SpinnerActions } from '../actions';

export interface SpinnerState {
  show: boolean;
}

const initialState: SpinnerState = {
  show: false
};


export function reducer(state: SpinnerState = initialState, action: Action): SpinnerState {
  const specificAction = action as SpinnerActions.SpinnerActionsUnion;

  switch (specificAction.type) {
      case SpinnerActions.showSpinnerAction.type:
          return { ...state, show: true };
      case SpinnerActions.hideSpinnerAction.type:
          return { ...state, show: false };
      default:
          return state;
  }
}

export const getSpinnerShow = (state: SpinnerState) => state.show;


