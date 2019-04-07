import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule, FlexLayoutModule, AngularCdkModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './core/components/nav/nav.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { NotFoundPageComponent} from './core/containers/not-found-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AngularCdkModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
