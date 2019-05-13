
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
    fileData: ArrayBuffer | null;
    status: FileUploadStatus;
    ipfsHash: string | null
}

const initialState: State = {
    fileData: null,
    status: 'Pending',
    ipfsHash: null,
};

export const reducer = createReducer(
  initialState,
  on(IpfsUploadActions.add, (state, { fileData }) => ({
    ...state,
    fileData,
    status: 'Pending',
    ipfsHash: null
  })),
  on(IpfsUploadActions.start, state => ({
    ...state,
    status: 'Progress',
  })),
  on(IpfsUploadActions.success, (state, { ipfsHash }) => ({
    ...state,
    status: 'Success',
    ipfsHash
  })),
  on(IpfsUploadActions.fail, state => ({
    ...state,
    status: 'Error',
    ipfsHash: null
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
export const getFileData = createSelector(getIpfsUploadState, (state: State) => state.fileData);
