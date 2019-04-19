import { Action } from '@ngrx/store';
import { ErrorActions } from '../actions';

export interface ErrorState {
  error: string | null;
}

const initialState: ErrorState = {
  error: null
};


export function reducer(state: ErrorState = initialState, action: Action): ErrorState {
  const specificAction = action as ErrorActions.ErrorActionsUnion;

  switch (specificAction.type) {
      case ErrorActions.errorMessage.type:
          return { ...state, error: specificAction.errorMsg };
     
      default:
          return state;
  }
}

export const getError = (state: ErrorState) => state.error;

