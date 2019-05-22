
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FileModel } from '../../models/file-model-interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-show-ipfs-image',
  templateUrl: 'show-ipfs-image.component.html',
  styleUrls: ['show-ipfs-image.component.css']
})
export class ShowIpfsImageComponent {

    constructor(
        public dialogRef: MatDialogRef<ShowIpfsImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FileModel) { }

    onOk(): void {
        this.dialogRef.close();
    }

}
