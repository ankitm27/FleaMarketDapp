
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
            exhaustMap((ipfsHash: string) => 
              this.ipfsSrv.getFile(ipfsHash).pipe(
              map((blob: Blob) => {

                const dialogConfig = new MatDialogConfig();
                dialogConfig.width = '500px';
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.data = blob;


                const dialogRef = this.dialog.open(ShowIpfsImageComponent, dialogConfig);

                //  * Gets an observable that is notified when the dialog is finished closing.
                return dialogRef.afterClosed();

              } ),
              catchError((err: Error) =>
               of(ErrorActions.errorMessage({ errorMsg: err.message }))
              )
             
             )

           )
       
          ),
          { dispatch: false });
    
          /**
           * CONVERT BASE64 TO BLOB
           * @param Base64Image Pass base64 image data to convert into the blob
           */
          private convertBase64ToBlob(Base64Image: any) {
            // SPLIT INTO TWO PARTS
            const parts = Base64Image.split(';base64,');
            // HOLD THE CONTENT TYPE
            const imageType = parts[0].split(':')[1];
            // DECODE BASE64 STRING
            const decodedData = window.atob(parts[1]);
            // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
            const uInt8Array = new Uint8Array(decodedData.length);
            // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
            for (let i = 0; i < decodedData.length; ++i) {
                uInt8Array[i] = decodedData.charCodeAt(i);
            }
            // RETURN BLOB IMAGE AFTER CONVERSION
            return new Blob([uInt8Array], { type: imageType });
          }


   
}
