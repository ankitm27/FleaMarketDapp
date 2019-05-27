
import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy, ViewChild , ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { windowRefToken } from '../../../core/services/tokens';
import { Observable, Subject } from 'rxjs';
import {takeUntil, map, tap, filter, take } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/ipfs-upload.reducer';
import * as IpfsActions from '../../store/ipfs-upload.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-show-ipfs-image',
  templateUrl: 'show-ipfs-image.component.html',
  styleUrls: ['show-ipfs-image.component.css']
})
export class ShowIpfsImageComponent implements OnInit, OnDestroy {

  @ViewChild('ipfsImage') image: ElementRef;

  constructor(
        private store$: Store<fromStore.AppState>,
        public dialogRef: MatDialogRef<ShowIpfsImageComponent>,
        @Inject(windowRefToken) private windowRef: Window
        ) { }

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit() {

    this.checkStore().pipe(
      takeUntil(this.unsubscribe$),
      tap((blob) => {
        console.log('Blob', blob);
        this.image.nativeElement.src = this.windowRef.URL.createObjectURL(blob);
      } )
    ).subscribe()

  }

  checkStore(): Observable<Blob> {
    return this.store$.pipe(
      select(fromStore.getImageBlob),
       tap(image => {
        if (!image) {
          this.store$.dispatch(IpfsActions.load_image);
        }
      }),
     
      filter(image => !!image),
      take(1)
    );
}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
