
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { of} from 'rxjs';

import { IpfsDaemonService } from '../../core/services/ipfs-daemon.services';
import * as IpfsUploadActions  from './ipfs-upload.actions';
import { ErrorActions } from '../../core/store/actions';

@Injectable()
export class IpfsUploadEffects {
  constructor(
    private ipfsSrv: IpfsDaemonService,
    private readonly actions$: Actions
  ) {}


  uploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsUploadActions.start),
        map(action => action.file),
        exhaustMap((file) => {
          // const fileStream =  (window as any).IpfsHttpClient.Buffer.from(data.content);
          //  const path = data.path;
          
          return this.ipfsSrv.addFile(file).pipe(
            tap(ipfsHash => console.log(`IPFS file hash: ${ipfsHash}`)),
            map(ipfsHash => IpfsUploadActions.success({ipfsHash})),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }), IpfsUploadActions.fail)
            )
          )
        })
   
      ));

   
}
