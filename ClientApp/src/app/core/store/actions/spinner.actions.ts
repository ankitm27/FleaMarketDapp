
import { createAction, union } from '@ngrx/store';

export const show = createAction('[Spinner] Show');
export const hide = createAction('[Spinner] Hide');

const all = union({ show, hide });
export type SpinnerActionsUnion = typeof all;