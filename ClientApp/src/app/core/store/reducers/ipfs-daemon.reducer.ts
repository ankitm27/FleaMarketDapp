import { createReducer, on } from '@ngrx/store';
import { IpfsActions } from '../actions';

export interface IpfsDaemonState {
  connectStatus: boolean;
}

const initialState: IpfsDaemonState = {
  connectStatus: false,
};

export const reducer = createReducer(
  initialState,
  on(IpfsActions.connectSuccess, state => ({
    ...state,
    connectStatus: true
  })),
);

export const getIpfsConnectStatus = (state: IpfsDaemonState) =>
  state.connectStatus;
