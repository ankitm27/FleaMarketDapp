import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../core/store/reducers';

import { ipfsToken } from '../../../core/services/tokens';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit, OnDestroy {
  public attack$: Observable<string>;

  constructor(
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder,
    @Inject(ipfsToken) private ipfs
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();

  frmGroup: FormGroup = this.formBuilder.group({
    // attack: ''
  });

  ngOnInit() {

    this.ipfs
      .id()
      .then(res => {
        console.log(`daemon active ${res.id}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
