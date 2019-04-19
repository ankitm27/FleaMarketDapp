
import { createAction, union, props} from '@ngrx/store';

export const init = createAction('[Web3/Provider] Init');
export const initSuccess = createAction('[Web3/Provider] Init Success');
export const account = createAction('[Web3/Provider] Account',  props<{ address: string }>());
export const balance = createAction('[Web3/Provider] Balance');
export const balanceSuccess = createAction('[Web3/Provider] Balance Success',  props<{ balance: string }>());

const all = union({ init, initSuccess, account, balance, balanceSuccess });
export type web3ProviderActionsUnion = typeof all;
