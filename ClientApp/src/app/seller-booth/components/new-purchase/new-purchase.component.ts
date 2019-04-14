import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit, OnDestroy {
  public attack$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  private unsubscribe$: Subject<void> = new Subject<void>();
 

  frmGroup: FormGroup = this.formBuilder.group({
    // attack: ''
  });

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

 

}
