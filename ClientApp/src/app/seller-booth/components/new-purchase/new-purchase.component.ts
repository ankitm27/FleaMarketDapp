import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    title: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
  });

  ngOnInit() {
  }

  formControl = (name: string) => this.frmGroup.get(`${name}`);

  required = (name: string) =>
      this.formControl(name).hasError('required') && this.formControl(name).touched;

  invalidPattern = (name: string) =>
      // 'dirty' means that the user is actually interacted with the control
      // making attempt of typing vs just focusing or blaring 
      this.formControl(name).hasError('pattern') && this.formControl(name).dirty;


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
