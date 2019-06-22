
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';

import * as guards from './core/guards';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'p2p-bazaar',
    // here we use the TypeScript Dynamic Imports in Angular 8
    loadChildren: () => import('./p2p-bazaar/p2p-bazaar.module').then(mod => mod.P2pBazaarModule),
    canActivate: [guards.EthInitGuard],
  },
  { path: '**', component: NotFoundPageComponent }, // !!!has to be the last one 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
