
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../../environments/environment';

import * as fromSpinner from './spinner.reducer';
import * as fromError from './error.reducer';

// nice moment here
// here is our root state, which also includes the route state
export interface AppState {
  router: RouterReducerState;
  spinner: fromSpinner.SpinnerState;
  error: fromError.ErrorState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  spinner: fromSpinner.reducer,
  error: fromError.reducer,
};

export const metaReducers = environment.production ? [] : [storeFreeze];


export const getSpinnerState = createFeatureSelector<AppState, fromSpinner.SpinnerState>(
  'spinner'
);

export const getSpinnerShow = createSelector(
  getSpinnerState,
  fromSpinner.getSpinnerShow
);


export const getErrorState = createFeatureSelector<AppState, fromError.ErrorState>(
  'error'
);

export const getError = createSelector(
  getErrorState,
  fromError.getError
);
