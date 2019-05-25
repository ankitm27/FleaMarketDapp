
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FileModel } from '../../models/file-model-interface';
import { Buffer } from 'buffer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-show-ipfs-image',
  templateUrl: 'show-ipfs-image.component.html',
  styleUrls: ['show-ipfs-image.component.css']
})
export class ShowIpfsImageComponent implements OnInit {

  imageUrl: string;
  constructor(
        public dialogRef: MatDialogRef<ShowIpfsImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Buffer
        ) { }


        ngOnInit() {

          this.imageUrl = this.data.toString('base64');
        //var urlCreator = window.URL;
        //var arrayBufferView = new Uint8Array(  this.data );
        //var blob = new Blob( [ arrayBufferView], { type: 'image/png' } );
        //this.imageUrl = urlCreator.createObjectURL( blob);

   
        }
}
