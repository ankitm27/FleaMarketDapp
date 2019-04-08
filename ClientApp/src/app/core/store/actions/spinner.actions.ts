

import { createAction, union } from '@ngrx/store';

export const showSpinnerAction = createAction('[Spinner] Show');
export const hideSpinnerAction = createAction('[Spinner] Hide');

const all = union({ showSpinnerAction, hideSpinnerAction });
export type SpinnerActionsUnion = typeof all;
