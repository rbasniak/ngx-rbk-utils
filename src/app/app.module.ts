import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxRbkUtilsModule, buildState, ApplicationActions } from 'ngx-rbk-utils';
import { rbkConfig } from 'src/global/ngx-rbk.settings';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmzDialogsConfig, SmzDialogsModule } from 'ngx-smz';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

const smzDialogsConfig: SmzDialogsConfig = {
  requiredByDefault: true,
  requiredMessage: 'Campo Obrigatório.',
  blockScroll: false,
  baseZIndex: 1500
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SmzDialogsModule.forRoot(smzDialogsConfig),
    NgxRbkUtilsModule.forRoot(rbkConfig),
    NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store) {
    this.store.dispatch(new ApplicationActions.NgRxInitialized());
  }
}
