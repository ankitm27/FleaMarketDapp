
import { Injectable } from '@angular/core';
import { exhaustMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { of, empty} from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { IpfsDaemonService } from '../../../core/services/ipfs-daemon.services';

import * as fromPurchaseContract from '../reducers';
import { IpfsUploadActions }  from '../actions';
import { ErrorActions } from '../../../core/store/actions';



@Injectable()
export class IpfsUploadEffects {
  constructor(
    private store$: Store<fromPurchaseContract.AppState>,
    private ipfsSrv: IpfsDaemonService,
    private readonly actions$: Actions,
  ) {}


  uploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsUploadActions.upload_image),
        map(action => action.file),
        exhaustMap((file) => {
          // const fileStream =  (window as any).IpfsHttpClient.Buffer as Buffer;

          return this.ipfsSrv.addFile(file).pipe(
            tap(ipfsHash => console.log(`IPFS file hash: ${ipfsHash}`)),
            map(ipfsHash => IpfsUploadActions.upload_image_success({ipfsHash})),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }), IpfsUploadActions.upload_image_fail)
            )
          )
        })
   
      ));

      loadFile$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(IpfsUploadActions.load_image),
            withLatestFrom(this.store$.pipe(select(fromPurchaseContract.getIpfsHash))),
            map(([action, ipfsHash]) => ipfsHash),
            exhaustMap((ipfsHash: string) => 
              this.ipfsSrv.getFile(ipfsHash).pipe(
                map((image: Blob) => IpfsUploadActions.load_image_success({ image })),
                catchError((err: Error) =>
                  of(ErrorActions.errorMessage({ errorMsg: err.message }))
              )
             )
            )
       
          )
        );
    
   
}
