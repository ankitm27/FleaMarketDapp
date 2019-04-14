import { Action } from '@ngrx/store';
import { Web3ProviderActions } from '../actions';

export interface Web3ProviderState {
  metamaskEnable: boolean;
}

const initialState: Web3ProviderState = {
  metamaskEnable: false
};


export function reducer(state: Web3ProviderState = initialState, action: Action): Web3ProviderState {
  const specificAction = action as Web3ProviderActions.web3ProviderActionsUnion;

  switch (specificAction.type) {
      case Web3ProviderActions.web3ProviderInitSuccess.type:
          return { ...state, metamaskEnable: true };
     
      default:
          return state;
  }
}

export const getMetaMaskEnable = (state: Web3ProviderState) => state.metamaskEnable;


