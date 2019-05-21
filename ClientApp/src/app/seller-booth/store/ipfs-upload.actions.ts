
import { createAction, props} from '@ngrx/store';
import { FileModel } from '../models/file-model-interface';

export const reset = createAction('[IPFS/Upload] Add');  // status Pending
export const start = createAction('[IPFS/Upload] Start', props<FileModel>());  // status Progress

export const success = createAction('[IPFS/Upload] Success', props<{ ipfsHash: string }>()); // status Success
export const fail = createAction('[IPFS/Upload] Fail'); // status Error
