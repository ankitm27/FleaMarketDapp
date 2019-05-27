
import {
  createReducer, on,
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';
import * as IpfsUploadActions from './ipfs-upload.actions';
import * as root from '../../core/store/reducers';

export type FileUploadStatus = 'Pending' | 'Success' | 'Error' | 'Progress';

export interface State {
    status: FileUploadStatus;
    ipfsHash: string | null;
    imageBlob?: Blob;
}

const initialState: State = {
    status: 'Pending',
    ipfsHash: null,
    imageBlob: null
};

export const reducer = createReducer(
  initialState,
  on(IpfsUploadActions.reset, () => initialState),
  on(IpfsUploadActions.upload_image, state => ({
    ...state,
    status: 'Progress',
  })),
  on(IpfsUploadActions.upload_image_success, (state, { ipfsHash }) => ({
    ...state,
    status: 'Success',
    ipfsHash
  })),
  on(IpfsUploadActions.upload_image_fail, state => ({
    ...state,
    status: 'Error',
    ipfsHash: null
  })),
  on(IpfsUploadActions.load_image_success, (state, { image }) => ({
    ...state,
    status: 'Success',
    imageBlob: image
  })),
 
);


// add new state slice
export interface IpfsUploadState {
  ipfsUpload: State;
}

export interface AppState extends root.AppState {
  ipfsUploadState: IpfsUploadState;
}

export function reducers(state: IpfsUploadState | undefined, action: Action) {
  return combineReducers({
    ipfsUpload: reducer
  })(state, action);
}


export const getIpfsUploadStateSlice = createFeatureSelector<AppState, IpfsUploadState>(
  'ipfsUploadState'
);

export const getIpfsUploadState = createSelector(getIpfsUploadStateSlice, state => state.ipfsUpload);

export const getIpfsUploadStatus = createSelector(getIpfsUploadState, (state: State) => state.status);
export const getIpfsHash = createSelector(getIpfsUploadState, (state: State) => state.ipfsHash);

export const getImageBlob = createSelector(getIpfsUploadState, (state: State) => state.imageBlob);