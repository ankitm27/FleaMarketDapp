
import {
    createSelector,
    createFeatureSelector,
    Action,
    combineReducers,
  } from '@ngrx/store';

  import * as fromRoot from '../../../core/store/reducers';
  import * as fromIpfsUpload from './ipfs-upload.reducer';

  
  export interface PurchaseContractState {
    ipfsUpload: fromIpfsUpload.State;
    // product entity state: fromProductEntity.State
  }
  
  
  export interface AppState extends fromRoot.AppState {  
    purchaseContract: PurchaseContractState;
  }
  
  export function reducers(state: PurchaseContractState | undefined, action: Action) {
    return combineReducers({
      ipfsUpload: fromIpfsUpload.reducer,
      // add another reducer
    })(state, action);
  }
  
  
  export const selectPurchaseContractState = createFeatureSelector<AppState, PurchaseContractState>(
    'purchaseContract'
  );
  
  export const selectIpfsUploadState = createSelector(selectPurchaseContractState, state => state.ipfsUpload);
  
  export const getIpfsUploadStatus = createSelector(selectIpfsUploadState, fromIpfsUpload.getIpfsUploadStatus);
  export const getIpfsHash = createSelector(selectIpfsUploadState, fromIpfsUpload.getIpfsHash);
  export const getImageBlob = createSelector(selectIpfsUploadState, fromIpfsUpload.getImageBlob);