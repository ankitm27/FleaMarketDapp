
import { createAction, union } from '@ngrx/store';

export const show = createAction('[Spinner] Show');
export const hide = createAction('[Spinner] Hide');

export type SpinnerActionsUnion = ReturnType<typeof show | typeof hide>;