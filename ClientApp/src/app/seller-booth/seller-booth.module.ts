import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, FlexLayoutModule } from '../shared';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/ipfs-upload.reducer';
import { IpfsUploadEffects } from './store/ipfs-upload.effects';

import { PurchaseContractComponent } from './containers/purchase-contract/purchase-contract.component';
import { ShowIpfsImageComponent } from './components/show-ipfs-image/show-ipfs-image.component'

const routes: Routes = [
  {
      path: '',
      component: PurchaseContractComponent,
  },

];

@NgModule({
  declarations: [
    PurchaseContractComponent,
    ShowIpfsImageComponent],
   
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule ,
    ReactiveFormsModule,

    RouterModule.forChild(routes),

    StoreModule.forFeature('ipfsUploadState', reducers),
    EffectsModule.forFeature([IpfsUploadEffects])
  ],
})
export class SellerBoothModule { }