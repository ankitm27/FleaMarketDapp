
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

          this.image.nativeElement.src = this.windowRef.URL.createObjectURL(this.data);
        
        }
}
