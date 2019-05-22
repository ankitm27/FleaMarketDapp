
import { createAction, props} from '@ngrx/store';

export const reset = createAction('[IPFS/Upload] Reset');  // status Pending
export const start = createAction('[IPFS/Upload] Start', props<{file: File}>());  // status Progress

export const success = createAction('[IPFS/Upload] Success', props<{ ipfsHash: string }>()); // status Success
export const fail = createAction('[IPFS/Upload] Fail'); // status Error
