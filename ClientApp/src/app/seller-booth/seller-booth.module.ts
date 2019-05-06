import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, FlexLayoutModule } from '../shared';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { reducers } from './attack-change.reducers';
// import { AttackChangeEffects } from './attack-change.effects';

// Services
// import { AttackChangeService } from './attack-change.services';

import { PurchaseContractComponent } from './components/purchase-contract/purchase-contract.component';

const routes: Routes = [

  {
      path: '',
      component: PurchaseContractComponent,
  },

];

@NgModule({
  declarations: [PurchaseContractComponent],
   
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule ,
    ReactiveFormsModule,

    RouterModule.forChild(routes),

    // StoreModule.forFeature('attackState', reducers),
    // EffectsModule.forFeature([AttackChangeEffects])
  ],
  // providers: [AttackChangeService]
})
export class SellerBoothModule { }