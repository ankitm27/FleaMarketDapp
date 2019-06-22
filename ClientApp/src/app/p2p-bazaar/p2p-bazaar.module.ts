import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, FlexLayoutModule } from '../shared';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { IpfsUploadEffects } from './store/effects/ipfs-upload.effects';

import * as fromContainers from './containers';
import { ShowIpfsImageComponent } from './components/show-ipfs-image/show-ipfs-image.component'

const routes: Routes = [
  {
    path: '',
    // component: fromContainers.PurchaseContractCollectionComponent,
    // canActivate: [fromGuards.ProjectsInitialLoadGuard],
  },
  {
      path: 'new',
      component: fromContainers.NewPurchaseContractComponent,
  },
  {
      path: ':id',
      // component: fromContainers.SelectPurchaseContractComponent,
      // we need to make sure this guard is triggered when we link /projects/id;source=table clicked from email
      // canActivate: [fromGuards.ProjectExistsGuard],  
  }

  ];

  export const CONTAINERS = [
    fromContainers.NewPurchaseContractComponent,
    
  ];

  export const COMPONENTS = [
    ShowIpfsImageComponent,
  ];
  

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],

  
  /*based on https://alligator.io/angular/anatomy-angular-module/
     * This is for components that can�t be found by the Angular compiler during compilation time 
     * because they are not referenced anywhere in component templates. 

      Components that should go into entryComponents are not that common. 
      A good example would be Angular Material dialogs, because they are created dynamically, 
      and the Angular compiler would not know about them otherwise.
     * */
  entryComponents: [
      ShowIpfsImageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule ,
    ReactiveFormsModule,

    RouterModule.forChild(routes),

    StoreModule.forFeature('purchaseContract', reducers),
    EffectsModule.forFeature([IpfsUploadEffects])
  ],
})
export class P2pBazaarModule { }