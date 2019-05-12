import { Injectable, Inject } from '@angular/core';

import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of, fromEvent} from 'rxjs';
import { switchMap, withLatestFrom, map, tap, catchError } from 'rxjs/operators';

import { ipfsToken } from '../../core/services/tokens';
import * as IpfsUploadActions  from './ipfs-upload.actions';
import {  ErrorActions } from '../../core/store/actions';
import * as fromStore from './ipfs-upload.reducer';

@Injectable()
export class IpfsUploadEffects {
  constructor(
    @Inject(ipfsToken) private ipfs,
    private rootStore$: Store<fromStore.AppState>,
    private readonly actions$: Actions
  ) {}


  uploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsUploadActions.start),

        withLatestFrom(
          this.rootStore$.select(fromStore.getIpfsFile),
          (action, file) => ({ action, file})
      ),
        
        // we use the switchMap. The user can change his mind and upload another file without waiting for the previous action to materialize. 
        switchMap((data) => {

          const reader = new FileReader();
          reader.readAsDataURL(data.file); 
          const source = fromEvent(reader, 'onload');
         
          
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


 
}
