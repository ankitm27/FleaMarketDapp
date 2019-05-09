
import { createReducer, on } from '@ngrx/store';
import { IpfsUploadActions } from '../actions';

export type FileUploadStatus = 'Pending' | 'Success' | 'Error' | 'Progress';

export interface IpfsUploadState {
    status: FileUploadStatus;
    ipfsHash: string | null
}

const initialState: IpfsUploadState = {
    status: 'Pending',
    ipfsHash: null,
};

export const reducer = createReducer(
  initialState,
  on(IpfsUploadActions.start, state => ({
    ...state,
    status: 'Progress',
    ipfsHash: null
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
  on(IpfsUploadActions.reset, state => ({
    ...state,
    status: 'Pending',
    ipfsHash: null
  })),
);


export const getUploadStatus = (state: IpfsUploadState) => state.status;
export const getIpfsHash = (state: IpfsUploadState) => state.ipfsHash;
