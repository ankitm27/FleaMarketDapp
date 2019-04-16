

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, tap, filter, switchMap, catchError } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import * as fromEth from '../../ethereum';


@Injectable({
  providedIn: CoreModule,
})
export class EthInitGuard implements CanActivate {
  constructor(private store: Store<fromEth.AppState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(

        switchMap(() => of(true)),
        catchError(() => of(false))
    );
  }


  checkStore(): Observable<boolean> {
      return this.store.pipe(
        select(fromEth.getConStatus),
        // notice that the tap() will have no effect on the stream
        // it just does some stuff and passes the observable it received down to the next operator

        tap(connected => {
          if (!connected) {
            this.store.dispatch(new fromEth.InitEth());

          }
        }),
        // Notice that the filter() returns the observable sequence that contains elements
        // from the input sequence that satisfy the condition.
        // so in this case, if the loaded is false, the steam will not continue, but
        // when the loaded is true, we grab this bool value. Which means we are waiting for the
        // loaded value has become true and then we continue the stream and take this one value .
        // after that the whole stream will be completed.
              filter(connected => connected),
              take(1)
      );
  }



}
