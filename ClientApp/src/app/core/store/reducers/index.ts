
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../../environments/environment';

import * as fromSpinner from './spinner.reducer';
import * as fromError from './error.reducer';
import * as fromWeb3Provider from './web3-provider.reducer';
import * as fromIpfsDaemon from './ipfs-daemon.reducer';
import * as fromIpfsUpload from './ipfs-upload.reducer';

// nice moment here
// here is our root state, which also includes the route state
export interface AppState {
  router: RouterReducerState;
  spinner: fromSpinner.SpinnerState;
  error: fromError.ErrorState;
  web3Provider: fromWeb3Provider.Web3ProviderState;
  ipfsDaemon: fromIpfsDaemon.IpfsDaemonState;
  ipfsUpload: fromIpfsUpload.IpfsUploadState
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  spinner: fromSpinner.reducer,
  error: fromError.reducer,
  web3Provider: fromWeb3Provider.reducer,
  ipfsDaemon: fromIpfsDaemon.reducer,
  ipfsUpload: fromIpfsUpload.reducer
};

export const metaReducers = environment.production ? [] : [storeFreeze];


export const selectSpinnerState = createFeatureSelector<AppState, fromSpinner.SpinnerState>(
  'spinner'
);
export const getSpinnerShow = createSelector(
  selectSpinnerState,
  fromSpinner.getSpinnerShow
);


export const selectErrorState = createFeatureSelector<AppState, fromError.ErrorState>(
  'error'
);

export const getError = createSelector(
  selectErrorState,
  fromError.getError
);

export const selectWeb3ProviderState = createFeatureSelector<AppState, fromWeb3Provider.Web3ProviderState>(
  'web3Provider'
);
export const getMetaMaskEnable = createSelector(
  selectWeb3ProviderState,
  fromWeb3Provider.getMetaMaskEnable
);
export const getAccount = createSelector(
  selectWeb3ProviderState,
  fromWeb3Provider.getAccount
);
export const getBalance = createSelector(
  selectWeb3ProviderState,
  fromWeb3Provider.getBalance
);

export const selectIpfsDaemonState = createFeatureSelector<AppState, fromIpfsDaemon.IpfsDaemonState>(
  'ipfsDaemon'
);
export const getIpfsConnectStatus = createSelector(
  selectIpfsDaemonState,
  fromIpfsDaemon.getIpfsConnectStatus
);

export const selectIpfsUploadState = createFeatureSelector<AppState, fromIpfsUpload.IpfsUploadState>(
  'ipfsUpload'
);
export const getIpfsUploadStatus = createSelector(
  selectIpfsUploadState,
  fromIpfsUpload.getUploadStatus
);

export const getIpfsHash = createSelector(
  selectIpfsUploadState,
  fromIpfsUpload.getIpfsHash
);