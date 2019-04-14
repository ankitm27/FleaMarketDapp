
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../../environments/environment';

import * as fromSpinner from './spinner.reducer';
import * as fromError from './error.reducer';
import * as fromWeb3Provider from './web3-provider.reducer';

// nice moment here
// here is our root state, which also includes the route state
export interface AppState {
  router: RouterReducerState;
  spinner: fromSpinner.SpinnerState;
  error: fromError.ErrorState;
  web3Provider: fromWeb3Provider.Web3ProviderState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  spinner: fromSpinner.reducer,
  error: fromError.reducer,
  web3Provider: fromWeb3Provider.reducer,
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

export const getWeb3ProviderState = createFeatureSelector<AppState, fromWeb3Provider.Web3ProviderState>(
  'web3Provider'
);

export const getMetaMaskEnable = createSelector(
  getWeb3ProviderState,
  fromWeb3Provider.getMetaMaskEnable
);
