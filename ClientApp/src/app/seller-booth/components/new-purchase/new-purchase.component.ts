import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as fromRoot from '../../../core/store/reducers';
import { Web3ProviderActions } from '../../../core/store/actions';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit, OnDestroy {
  public attack$: Observable<string>;

  constructor(
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();
 

  frmGroup: FormGroup = this.formBuilder.group({
    // attack: ''
  });

  ngOnInit() {
    // move it later to guard
    this.store.dispatch(Web3ProviderActions.web3ProviderInit());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

 

}
