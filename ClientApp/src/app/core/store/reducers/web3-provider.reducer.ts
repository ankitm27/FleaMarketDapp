import { Action } from '@ngrx/store';
import { Web3ProviderActions } from '../actions';

export interface Web3ProviderState {
  metamaskEnable: boolean;
  address: string;
  balance: string;
}

const initialState: Web3ProviderState = {
  metamaskEnable: false,
  address: null,
  balance: null,
};


export function reducer(state: Web3ProviderState = initialState, action: Action): Web3ProviderState {
  const specificAction = action as Web3ProviderActions.web3ProviderActionsUnion;

  switch (specificAction.type) {
      case Web3ProviderActions.web3ProviderInitSuccess.type:
          return { ...state, metamaskEnable: true };
      case Web3ProviderActions.getAccountAddress.type:
          return { ...state, address: specificAction.address };
      case Web3ProviderActions.getAccountBalance.type:
          return { ...state, balance: specificAction.balance };
      default:
          return state;
  }
}

export const getMetaMaskEnable = (state: Web3ProviderState) => state.metamaskEnable;
export const getAddress = (state: Web3ProviderState) => state.address;
export const getBalance = (state: Web3ProviderState) => state.balance;



