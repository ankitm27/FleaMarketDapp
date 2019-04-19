import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { ErrorActions } from '../actions';


@Injectable()
export class ErrorEffects {

    constructor(private readonly actions$: Actions<ErrorActions.ErrorActionsUnion>) {
    }

    @Effect({ dispatch: false })
    handleError$ = this.actions$
    .pipe(
      ofType(ErrorActions.errorMessage.type),
      tap(action => console.error('Got error:', action.errorMsg))
    );

   
}
