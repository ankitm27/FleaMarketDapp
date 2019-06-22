
import {
    createSelector,
    createFeatureSelector,
    Action,
    combineReducers,
  } from '@ngrx/store';

  import * as fromRoot from '../../../core/store/reducers';
  import * as fromIpfsUpload from './ipfs-upload.reducer';
  import * as fromProducts from './purchase-contract.reducer';

  
  export interface PurchaseContractState {
    ipfsUpload: fromIpfsUpload.State;
    products: fromProducts.State
  }
  
  
  export interface AppState extends fromRoot.AppState {  
    purchaseContract: PurchaseContractState;
  }
  
  export function reducers(state: PurchaseContractState | undefined, action: Action) {
    return combineReducers({
      ipfsUpload: fromIpfsUpload.reducer,
      products: fromProducts.reducer
    })(state, action);
  }
  
  
  export const selectPurchaseContractState = createFeatureSelector<AppState, PurchaseContractState>(
    'purchaseContract'
  );
  
  export const selectIpfsUploadState = createSelector(selectPurchaseContractState, state => state.ipfsUpload);
  
  export const getIpfsUploadStatus = createSelector(selectIpfsUploadState, fromIpfsUpload.getIpfsUploadStatus);
  export const getIpfsHash = createSelector(selectIpfsUploadState, fromIpfsUpload.getIpfsHash);
  export const getImageBlob = createSelector(selectIpfsUploadState, fromIpfsUpload.getImageBlob);

  // ********************************************************************************
  export const getProductEntitiesState = createSelector(selectPurchaseContractState, state => state.products);

  export const getSelectedProductKey = createSelector(
    getProductEntitiesState,
    fromProducts.getSelectedKey
  );

  /**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getProductKeys,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
  getProductEntities,
  getSelectedProductKey,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
