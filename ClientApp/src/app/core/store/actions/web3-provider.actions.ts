

import { createAction, union } from '@ngrx/store';


export const web3ProviderInit = createAction('[Web3Provider] Init');
export const web3ProviderInitSuccess = createAction('[Web3Provider] Init Success');

const all = union({ web3ProviderInit, web3ProviderInitSuccess });
export type web3ProviderActionsUnion = typeof all;
