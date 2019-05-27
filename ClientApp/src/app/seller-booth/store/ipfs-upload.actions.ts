
import { createAction, props} from '@ngrx/store';

export const reset = createAction('[IPFS/Image] Reset');  // status Pending
export const upload_image = createAction('[IPFS/Image] Upload', props<{file: File}>());  // status Progress

export const upload_image_success = createAction('[IPFS/Image] Upload Success', props<{ ipfsHash: string }>()); // status Success
export const upload_image_fail = createAction('[IPFS/Image] Upload Fail'); // status Error
export const load_image = createAction('[IPFS/Image] Load Image'); // request to load image from IPFS
export const load_image_success = createAction('[IPFS/Image] Load Image Success', props<{image: Blob}>());