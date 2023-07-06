import { httpInterceptorProviders } from './core/http-interceptors';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LayoutsModule } from './layouts';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NotifierModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    StoreModule.forRoot({}, {}),
  ],
  bootstrap: [AppComponent],
  providers: httpInterceptorProviders,
})
export class AppModule {}
