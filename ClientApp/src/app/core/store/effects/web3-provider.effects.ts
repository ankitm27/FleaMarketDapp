import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from, EMPTY as empty } from 'rxjs';
import {exhaustMap, map, tap, catchError} from 'rxjs/operators';

import { MetamaskWeb3Provider } from '../../services/tokens';
import { Web3ProviderActions, SpinnerActions, ErrorActions}  from '../actions';


@Injectable()
export class Web3ProviderEffects {

    constructor(
      @Inject(MetamaskWeb3Provider) private web3Provider,
      private readonly actions$: Actions<Web3ProviderActions.web3ProviderActionsUnion>) {
    }

    @Effect()
    metaMaskEnable$: Observable<Action> = this.actions$.pipe(
      ofType(Web3ProviderActions.init.type),

      exhaustMap(() => {

        if ('enable' in this.web3Provider) {

          return from(this.web3Provider.enable())
          .pipe(

            tap((ethAccounts: string[]) =>
              console.log('Ethereum provider has been granted access to the following accounts', ethAccounts)
            ),
            map((ethAccounts: string[]) => {

              if (ethAccounts.length === 0) {
                return ErrorActions.errorMessage({errorMsg: 'Can not get any user accounts'});
              }

              return  Web3ProviderActions.initSuccess();
          
            }),

            // User denied account access
            catchError((err: Error) => of(ErrorActions.errorMessage({errorMsg: err.message}))),

          ); 

        }

        return empty;

      })

    );

    @Effect()
    showSpinner$: Observable<Action> = this.actions$.pipe(
      ofType(Web3ProviderActions.init.type),
      map(() => SpinnerActions.show()));

    @Effect()
    hideSpinner$: Observable<Action> = this.actions$.pipe(
      ofType(Web3ProviderActions.initSuccess.type, ErrorActions.errorMessage.type),
      map(() => SpinnerActions.hide()));


      // ''' to be continue ..put here effect to set address and balance
    
        
}
