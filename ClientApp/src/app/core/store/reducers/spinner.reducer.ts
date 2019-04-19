import { Action } from '@ngrx/store';
import { SpinnerActions } from '../actions';

export interface SpinnerState {
  show: boolean;
}

const initialState: SpinnerState = {
  show: false
};


/*
for future V8:
export const reducer = createReducer<SpinnerState>(
  [
    on(SpinnerActions.showAction, state => ({
      ...state,
      show: true
    })),

    on(SpinnerActions.hideAction, state => ({
      ...state,
      show: false,
    })),
  ],
  initialState
);

*/
export function reducer(state: SpinnerState = initialState, action: Action): SpinnerState {
  const specificAction = action as SpinnerActions.SpinnerActionsUnion;

  switch (specificAction.type) {
      case SpinnerActions.show.type:
          return { 
            ...state,
             show: true };
      case SpinnerActions.hide.type:
          return { 
            ...state, 
            show: false };
      default:
          return state;
  }
}

export const getSpinnerShow = (state: SpinnerState) => state.show;


