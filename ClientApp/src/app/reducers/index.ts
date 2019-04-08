
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';

import * as fromSpinner from '../core/store/reducers/layout.reducer';


// nice moment here
// here is our root state, which also includes the route state
export interface AppState {
  router: RouterReducerState;
  spinner: fromSpinner.SpinnerState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  spinner: fromSpinner.reducer
};

export const metaReducers = environment.production ? [] : [storeFreeze];


/**
 * Spinner Reducers
 */
export const getSpinnerState = createFeatureSelector<AppState, fromSpinner.SpinnerState>(
  'spinner'
);

export const getSpinnerShow = createSelector(
  getSpinnerState,
  fromSpinner.getSpinnerShow
);


