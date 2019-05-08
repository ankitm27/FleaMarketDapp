import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { IpfsDaemonService } from '../../services/ipfs-daemon.services';
import { IpfsActions, ErrorActions } from '../actions';

@Injectable()
export class IpfsDaemonEffects {
  constructor(
    private ipfsSrv: IpfsDaemonService,
    private readonly actions$: Actions
  ) {}

  onConnectEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => 
          this.ipfsSrv.getId().pipe(
            tap(id => console.log(`IPFS node id: ${id}`)),
            map(_ => IpfsActions.connectSuccess()),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }))
            )
          )
        )
      )
  );

 
}
