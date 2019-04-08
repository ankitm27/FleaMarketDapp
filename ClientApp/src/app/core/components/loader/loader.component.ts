
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Store } from '@ngrx/store';
//import * as fromStore from '../../store';

@Component({
    selector: 'app-loader',
    styleUrls: ['./loader.component.css'],
    template: `<div fxLayout="row" fxLayoutAlign="center stretch">
                  <div class= "loader-overlay" >
                    <ng-content *ngIf="!(loading$ | async); else spinner"> </ng-content>
                    <ng-template #spinner>
                            <div fxLayout="row" fxLayoutAlign = "center center">
                                <mat-spinner color='warn'> </mat-spinner>
                             </div>
                     </ng-template>
                   </div>
               </div>`
})
export class LoaderComponent implements OnInit {

    loading$: Observable<boolean>;

    //constructor(private store: Store<fromStore.AppState>) { }

    ngOnInit() {
        /*
        this.loading$ = this.store.select(fromStore.getSpinnerShow);

        // this one just for debugging store:
        this.store.select(fromStore.getSpinnerShow).subscribe(show => {
            console.log('Spinner show', show);

        });

        */

    }


}