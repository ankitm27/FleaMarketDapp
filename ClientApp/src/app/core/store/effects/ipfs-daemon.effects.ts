import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { ipfsToken } from '../../services/tokens';
// import { IpfsDaemonService } from '../../services/provider.services';
import { IpfsActions, ErrorActions } from '../actions';

@Injectable()
export class IpfsDaemonEffects {
  constructor(
    @Inject(ipfsToken) private ipfs,
    private readonly actions$: Actions
  ) {}

  onConnectEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
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

 
}
