
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-show-ipfs-image',
  templateUrl: 'show-ipfs-image.component.html',
  styleUrls: ['show-ipfs-image.component.css']
})
export class ShowIpfsImageComponent implements OnInit {

  imageUrl: any;
  constructor(
        public dialogRef: MatDialogRef<ShowIpfsImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Blob,
        private sanitizer: DomSanitizer
        ) { }


        ngOnInit() {

        this.imageUrl = 
         this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.data));
        
          //  this.imageUrl = this.data.toString('base64');
        //var urlCreator = window.URL;
        //var arrayBufferView = new Uint8Array(  this.data );
        //var blob = new Blob( [ arrayBufferView], { type: 'image/png' } );
        //this.imageUrl = urlCreator.createObjectURL( blob);

   
        }
}
