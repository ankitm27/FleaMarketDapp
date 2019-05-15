
import { createAction, props} from '@ngrx/store';

export const add = createAction('[IPFS/Upload] Add');  // status Pending
export const start = createAction('[IPFS/Upload] Start', props<{ 
    path: string,
    content: ArrayBuffer,
}>());  // status Progress

export const success = createAction('[IPFS/Upload] Success', props<{ ipfsHash: string }>()); // status Success
export const fail = createAction('[IPFS/Upload] Fail'); // status Error
