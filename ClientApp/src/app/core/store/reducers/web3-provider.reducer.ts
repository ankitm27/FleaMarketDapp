import { Action } from '@ngrx/store';
import { Web3ProviderActions } from '../actions';

export interface Web3ProviderState {
  metamaskEnable: boolean;
  account: string;
  balance: string;
}

const initialState: Web3ProviderState = {
  metamaskEnable: false,
  account: null,
  balance: null,
};


export function reducer(state: Web3ProviderState = initialState, action: Action): Web3ProviderState {
  const specificAction = action as Web3ProviderActions.web3ProviderActionsUnion;

  switch (specificAction.type) {
      case Web3ProviderActions.initSuccess.type:
          return { 
            ...state, 
            metamaskEnable: true 
          };
      case Web3ProviderActions.account.type:
          return { 
            ...state, 
            account: specificAction.address 
          };
      case Web3ProviderActions.balanceSuccess.type:
          return { 
            ...state, 
            balance: specificAction.balance 
          };
      default:
          return state;
  }
}

export const getMetaMaskEnable = (state: Web3ProviderState) => state.metamaskEnable;
export const getAccount = (state: Web3ProviderState) => state.account;
export const getBalance = (state: Web3ProviderState) => state.balance;



