
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild , ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { windowRefToken } from '../../../core/services/tokens';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-show-ipfs-image',
  templateUrl: 'show-ipfs-image.component.html',
  styleUrls: ['show-ipfs-image.component.css']
})
export class ShowIpfsImageComponent implements OnInit {

  @ViewChild('ipfsImage') image: ElementRef;

  constructor(
        public dialogRef: MatDialogRef<ShowIpfsImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Blob,
        @Inject(windowRefToken) private windowRef: Window
        ) { }


        ngOnInit() {

          /*


                const dialogConfig = new MatDialogConfig();
                dialogConfig.width = '500px';
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.data = blob;


                const dialogRef = this.dialog.open(ShowIpfsImageComponent, dialogConfig);

                //  * Gets an observable that is notified when the dialog is finished closing.
                return dialogRef.afterClosed();

             
          */

          this.image.nativeElement.src = this.windowRef.URL.createObjectURL(this.data);
        
        }
}
