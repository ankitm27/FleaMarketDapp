import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable, of, from, EMPTY as empty } from 'rxjs';
import {exhaustMap, switchMap, map, tap, catchError, finalize} from 'rxjs/operators';

import { WEB3PROVIDER } from '../../services/tokens';
import { Web3ProviderActions, SpinnerActions, ErrorActions}  from '../actions';


@Injectable()
export class Web3ProviderEffects {

    constructor(
      @Inject(WEB3PROVIDER) public web3Provider,
      private readonly actions$: Actions<Web3ProviderActions.web3ProviderActionsUnion>) {
    }

    @Effect()
      metaMaskEnable$ = this.actions$.pipe(
        ofType(Web3ProviderActions.web3ProviderInit.type),
        
        exhaustMap(() => {

          if ('enable' in this.web3Provider) {

            return from(this.web3Provider.enable())
            .pipe(

              tap((ethAccounts: string[]) =>
                console.log('Ethereum provider has been granted access to the following accounts', ethAccounts)
              ),
              map((ethAccounts: string[]) => {

                if (ethAccounts.length === 0) {
                  return ErrorActions.ethErrorAction({errorMsg: 'Can not get any user accounts'});
                }

                // set default account
                // this.ethSrv.defaultAccount = ethAccounts[0];

                // set the provider for the smart contract
                // this.smartContract.setProvider(this.web3.currentProvider);

                return  Web3ProviderActions.web3ProviderInitSuccess();
           
              }),

              // User denied account access
              catchError((err: Error) => of(ErrorActions.ethErrorAction({errorMsg: err.message}))),

            ); 

          }

          return empty;

        })

      );
   
}
