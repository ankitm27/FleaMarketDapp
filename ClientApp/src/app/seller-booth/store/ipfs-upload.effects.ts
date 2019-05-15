
import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { switchMap, withLatestFrom, map, tap, catchError } from 'rxjs/operators';

import { Buffer } from 'buffer';

import { ipfsToken } from '../../core/services/tokens';
import * as IpfsUploadActions  from './ipfs-upload.actions';
import { ErrorActions, SpinnerActions } from '../../core/store/actions';
import * as fromStore from './ipfs-upload.reducer';
import { empty } from 'rxjs';

@Injectable()
export class IpfsUploadEffects {
  constructor(
    @Inject(ipfsToken) private ipfs,
    private store$: Store<fromStore.AppState>,
    private readonly actions$: Actions
  ) {}


  showSpinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IpfsUploadActions.start),
      map(() => SpinnerActions.show())
    )
  );

  // fix it later
  hideSpinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IpfsUploadActions.success, ErrorActions.errorMessage),
      map(() => SpinnerActions.hide())
    )
  );

  
  uploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsUploadActions.start),
        withLatestFrom(
          this.store$.select(fromStore.getFileData),
          (action, fileData) => ({ action, fileData})
         ),
         map(data => data.fileData),
       
        switchMap((dataBuffer) => {
          const imgBuffer =  Buffer.from(dataBuffer);
          // console.log('from effect', imgBuffer)


          return empty();
        })
   

        //map(_ => IpfsUploadActions.success({ ipfsHash: 'Moby Dick' })),

      ));

      

  /*
  uploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsUploadActions.start),
        withLatestFrom(
          this.store$.select(fromStore.getIpfsFileData),
          (action, file) => ({ action, file})
        ),
        tap(data => console.log('from uploadFile$', data.file)),
        
        // we use the switchMap. The user can change his mind and upload another file without waiting for the previous action to materialize. 
        switchMap((data) => {

          
          
          return source.pipe(
            tap(event => console.log(`File onload event: ${JSON.stringify(event)}`)),
            map(_ => IpfsUploadActions.success({ ipfsHash: 'Moby Dick' })),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }))
            )
          )
          
          }
          
        )
      )
  );
*/
 
}
