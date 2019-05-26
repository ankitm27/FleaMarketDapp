
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild , ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WindowRefService } from '../../../core/services/window.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-show-ipfs-image',
  templateUrl: 'show-ipfs-image.component.html',
  styleUrls: ['show-ipfs-image.component.css']
})
export class ShowIpfsImageComponent implements OnInit {

  @ViewChild('ipfsImage') image: ElementRef;

  private _window: Window;
  constructor(
        public dialogRef: MatDialogRef<ShowIpfsImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Blob,
        private windowRefService: WindowRefService
        ) { }


        ngOnInit() {

          this._window = this.windowRefService.nativeWindow;
          this.image.nativeElement.src = this._window.URL.createObjectURL(this.data);
        
        }
}
