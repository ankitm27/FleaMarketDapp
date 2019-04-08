import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule, FlexLayoutModule, AngularCdkModule } from '../shared';

import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoaderComponent} from './components/loader/loader.component';
import { NotFoundPageComponent} from './containers/not-found-page.component';

export const COMPONENTS = [
  LoaderComponent,
  NavComponent,
  NotFoundPageComponent,
  DashboardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    AngularCdkModule,
],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
