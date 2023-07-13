import { RootStoreModule } from './core/store/root.store.module';
import { httpInterceptorProviders } from './core/http-interceptors';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LayoutsModule } from './layouts';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NotifierModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    StoreModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    RootStoreModule,
    FontAwesomeModule,
  ],
  bootstrap: [AppComponent],
  providers: httpInterceptorProviders,
})
export class AppModule {}
