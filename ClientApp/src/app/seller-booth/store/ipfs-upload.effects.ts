
import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { exhaustMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { of, empty} from 'rxjs';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../store/ipfs-upload.reducer';
import { IpfsDaemonService } from '../../core/services/ipfs-daemon.services';
import * as IpfsUploadActions  from './ipfs-upload.actions';
import { ErrorActions } from '../../core/store/actions';

import { ShowIpfsImageComponent } from '../components/show-ipfs-image/show-ipfs-image.component';

@Injectable()
export class IpfsUploadEffects {
  constructor(
    private store$: Store<fromStore.AppState>,
    private ipfsSrv: IpfsDaemonService,
    private readonly actions$: Actions,
    private dialog: MatDialog
  ) {}


  uploadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IpfsUploadActions.start),
        map(action => action.file),
        exhaustMap((file) => {
          // const fileStream =  (window as any).IpfsHttpClient.Buffer as Buffer;

          return this.ipfsSrv.addFile(file).pipe(
            tap(ipfsHash => console.log(`IPFS file hash: ${ipfsHash}`)),
            map(ipfsHash => IpfsUploadActions.success({ipfsHash})),
            
            catchError((err: Error) =>
              of(ErrorActions.errorMessage({ errorMsg: err.message }), IpfsUploadActions.fail)
            )
          )
        })
   
      ));

      loadFile$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(IpfsUploadActions.load),
            withLatestFrom(this.store$.pipe(select(fromStore.getIpfsHash))),
            map(([action, ipfsHash]) => ipfsHash),
            exhaustMap((ipfsHash) => {
              
              const dialogConfig = new MatDialogConfig();
              dialogConfig.width = '480px';
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = ipfsHash;


              const dialogRef = this.dialog.open(ShowIpfsImageComponent, dialogConfig);

              //  * Gets an observable that is notified when the dialog is finished closing.
              return dialogRef.afterClosed();
             
            })
       
          ),
          { dispatch: false });
    



   
}
