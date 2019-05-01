import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, createEffect, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, from } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { ipfsToken } from '../../services/tokens';
// import { IpfsDaemonService } from '../../services/provider.services';
import { IpfsActions, ErrorActions } from '../actions';

@Injectable()
export class IpfsDaemonEffects implements OnInitEffects {
  constructor(
    @Inject(ipfsToken) private ipfs,
    private readonly actions$: Actions
  ) {}

  onConnectEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsActions.connectInit),
        switchMap(() => {
          return from(this.ipfs.id()).pipe(
            tap((res: any) => console.log(`Connected to IPFS node! id: ${res.id}, agentVersion: ${res.agentVersion}, protocolVersion: ${res.protocolVersion}`)),
           
            map(_ => IpfsActions.connectSuccess()),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }))
            )
          );
        })
      )
  );

  ngrxOnInitEffects(): Action {
    return IpfsActions.connectInit();
  }
}
