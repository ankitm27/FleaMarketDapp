

import { createAction, props } from '@ngrx/store';

export const ethErrorAction = createAction('[Ether] Error',  props<{ errorMsg: string }>());

export type ErrorActionsUnion = ReturnType<typeof ethErrorAction>;

