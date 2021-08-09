import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxRbkUtilsModule, buildState, ApplicationActions } from 'ngx-rbk-utils';
import { rbkConfig } from 'src/global/ngx-rbk.settings';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { SecretRouteComponent } from './secret-route.component';
import { SuperSecretRouteComponent } from './super-secret-route.component';
import { NgxRbkUtilsConfig } from 'projects/ngx-rbk-utils/src/public-api';
import { NgxSmzDialogsModule, SmzControlType, SmzDialogsConfig, SmzFormsPresets } from 'ngx-smz-dialogs';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { NotSecretRouteComponent } from './not-secret-route.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

const compactPreset: SmzFormsPresets = {
  formTemplates: {
      extraSmall: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
      small: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
  },
  groupTemplates: {
      extraSmall: { row: 'col-12' },
      medium: { row: 'col-6' },
  },
  inputTemplates: {
      extraSmall: { row: 'col-12', },
      medium: { row: 'col-6', }
  },
  globalStyleScale: 0.9
};

const linearPreset: SmzFormsPresets = {
  formTemplates: { extraSmall: { horizontalAlignment: 'justify-content-start', verticalAlignment: 'align-items-start' } },
  groupTemplates: { extraSmall: { row: 'col-12' } },
  inputTemplates: { extraSmall: { row: 'col-12', } },
  globalStyleScale: 1
};

const smzDialogsConfig: SmzDialogsConfig = {
  dialogs: {
      behaviors: {
          showCancelButton: true,
          showConfirmButton: true,
          showCloseButton: true,
          useAdvancedResponse: false,
          closeOnEscape: false,
          showHeader: true,
          showFooter: true,
          dismissableMask: false,
          contentPadding: '1em',
      },
      builtInButtons: {
          confirmName: 'CONFIRMAR',
          cancelName: 'CANCELAR',
      },
      featureTemplate: {
          extraSmall: { row: 'col-12' }
      },
      dialogTemplate: {
          extraSmall: { row: 'col-12' },
          large: { row: 'col-6' },
      }
  },
  forms: {
      behaviors: {
          avoidFocusOnLoad: true,
          debounceTime: 400,
          flattenResponse: true,
          runCustomFunctionsOnLoad: false,
          skipFunctionAfterNextEmit: false,
          showErrorsMethod: 'touched'
      },
      validators: {
          isRequired: true,
      },
      validationMessages: [
          { type: 'required', message: 'Campo obrigatório.' },
          { type: 'minlength', message: 'Número mínimo de caracteres não atingido.' },
          { type: 'maxlength', message: 'Número máximo de caracteres ultrapassado.' },
          { type: 'min', message: 'Valor mínimo atingido' },
          { type: 'max', message: 'Valor máximo atingido' },
      ],
      controlTypes: {
          [SmzControlType.MULTI_SELECT]: {
              defaultLabel: 'Escolha uma ou mais opções'
          }
      },
      ...linearPreset
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SecretRouteComponent,
    SuperSecretRouteComponent,
    DialogsComponent,
    NotSecretRouteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSmzDialogsModule.forRoot(smzDialogsConfig),
    NgxRbkUtilsModule.forRoot(rbkConfig),
    NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production}),
    ToastModule,
    SidebarModule,
    ButtonModule
  ],
  providers: [{ provide: NgxRbkUtilsConfig, useValue: rbkConfig },
],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store) {
    this.store.dispatch(new ApplicationActions.NgRxInitialized());

    this.store.dispatch(new ApplicationActions.SetLogInfo({
      applicationArea: '',
      applicationLayer: 'Angular Client',
      applicationVersion: '15.33.245',
      extraData: ''
    }));
  }
}
