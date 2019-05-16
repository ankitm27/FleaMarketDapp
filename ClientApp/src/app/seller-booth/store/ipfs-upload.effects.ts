
import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { of} from 'rxjs';
import { Buffer } from 'buffer';

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
        
        exhaustMap((data) => {
          
          const fileStream =  Buffer.from(data.content);
          const path = data.path;
          
          return this.ipfsSrv.addFileToIPFS(fileStream, path).pipe(
            tap(ipfsHash => console.log(`IPFS file hash: ${ipfsHash}`)),
            map(ipfsHash => IpfsUploadActions.success({ipfsHash})),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }), IpfsUploadActions.fail)
            )
          )
        })
   
      ));

   
}
