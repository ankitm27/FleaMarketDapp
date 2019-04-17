
import { createAction, union, props} from '@ngrx/store';

export const web3ProviderInit = createAction('[Web3Provider] Init');
export const web3ProviderInitSuccess = createAction('[Web3Provider] Init Success');
export const getAccountAddress = createAction('[Account] Address',  props<{ address: string }>());
export const getAccountBalance = createAction('[Account] Balance',  props<{ balance: string }>());

const all = union({ web3ProviderInit, web3ProviderInitSuccess, getAccountAddress, getAccountBalance });
export type web3ProviderActionsUnion = typeof all;
