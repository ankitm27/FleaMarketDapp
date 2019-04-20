import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from, EMPTY as empty } from 'rxjs';
import {exhaustMap, switchMap, map, tap, catchError} from 'rxjs/operators';

import { MetamaskWeb3Provider } from '../../services/tokens';
import { ProviderService } from '../../services/provider.services';
import { Web3ProviderActions, SpinnerActions, ErrorActions}  from '../actions';


@Injectable()
export class Web3ProviderEffects {

    constructor(
      @Inject(MetamaskWeb3Provider) private web3Provider,
      private providerSrv: ProviderService,
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


    @Effect()
    getAccount$: Observable<Action> = this.actions$.pipe(
      ofType(Web3ProviderActions.initSuccess.type),
      switchMap(() => this.providerSrv.getAccount().pipe(
        map((address: string) =>  Web3ProviderActions.account({address})),
        catchError((err: Error) => of(ErrorActions.errorMessage({errorMsg: err.message}))),
      )),

    );

    @Effect()
    getBalance$: Observable<Action> = this.actions$.pipe(
      ofType(Web3ProviderActions.initSuccess.type),
      switchMap(() => this.providerSrv.getBalance().pipe(
        map((balance: string) =>  Web3ProviderActions.balanceSuccess({balance})),
        catchError((err: Error) => of(ErrorActions.errorMessage({errorMsg: err.message}))),
      )),

    );

        
}
