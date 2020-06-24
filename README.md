# 1. Setup

* Install and setup all dependencies needed by the library
    * [primeng](https://www.npmjs.com/package/primeng)
    * [ngx-smz](https://www.npmjs.com/package/ngx-smz)
    * [@ngxs/store](https://www.npmjs.com/package/@ngxs/store)
    * [@ngxs/router-plugin](https://www.npmjs.com/package/@ngxs/router-plugin)
    * [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)

* Install the library

        `npm install ngx-rbk-utils`

* Import the `NgxRbkUtilsModule` in your `AppModule` and pass the `buildState()` function in the `NgxsModule.forRoot()` method. Also import the `ToastModule` from `primeng`

   > IMPORTANT: you must import the module BEFORE all other `ngxs` modules

    Example:
    ```typescript
    @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      NgxRbkUtilsModule.forRoot(rbkConfig),  // before NGXS modules
      ...
      NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),  // call the buildState()
      NgxsRouterPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      ...
    ],
    providers: [],
    bootstrap: []
    })
    export class AppModule {
      ...
    }
    ```

* In the constructor of the `AppModule`, inject the NGRX `Store` and dispatch the following action:

    ```typescript
    export class AppModule {
    constructor(private store: Store) {
        this.store.dispatch(new ApplicationActions.NgRxInitialized());
    }
    }
    ```

* In your `AppComponent` inject the `BoilerplateService` and call the `.init()` method.

    ```typescript
    constructor(private boilerplateService: BoilerplateService) {
        this.boilerplateService.init();
    }
    ```

* In the `.forRoot()` method of the library you need to pass a configuration object. Please see the configuration section for the details.


* Define your `AppStateModel` for intellisense purposes

    ```typescript
    import { AppStateModel as RootStateModel } from 'ngx-rbk-utils';

    export interface AppStateModel extends RootStateModel
    {
        database: {
            state1: State1StateModel,
            state2: State2DbStateModel,
            state3: State3DbStateModel,
        },

        features: {
            feature1: Feature1StateModel,
            feature2: Feature2StateModel,
        };
    }
    ```

* Add `<p-toast>` and `<smz-general-dialog>` to your `app.component.html`
* Add `Issue that you dont import MessageService from PrimeNg`
* In the constructor of your error page, clear the local storage with :
```typescript
constructor() {
  localStorage.clear();
}
```

# 2. Configuration file

```typescript
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';

export const rbkConfig: NgxRbkUtilsConfig = {
    // Application name, will be shown in the browser's tab name
    applicationName: string,
    routes: {
        // Url path of the landing page of your application, this will be  used to redirect the user when he tries to access a protected route and is not authenticated. Ex.: '/'
        nonAuthenticatedRoute: string,
        // Url path of the authenticated root page of your application, this will be  used to redirect the user when he tries to access a protected route, is  authenticated but does not have access to it. Ex.: '/editor'
        authenticatedRoute: string,
        // Url path of the login page of your application, this will be used to redirect the user if the library fails to refresh the JWT access token. Ex.: '/login'
        login: string,
        // Url path of the error page of your application this will be used to redirect the user if a request fail with the following status:
        // 500, 0 or unmapped status. Ex.: '/error
        error: string
    },
    authentication: {
        login: {
            // Full url of your login endpoint, must be POST and accepts the following object: { username: string, password: string }
            url: string,
            // How you want to handle the errors returned by this endpoint, possible values are 'toast', 'dialog' nad 'none'
            errorHandlingType: string,
            // Name of the access token property in the endpoint response
            responsePropertyName: string,
            // How you want to handle the loading state on the store, possible values are 'global', 'local' and 'none'
            loadingBehavior: string,
        },
        refreshToken: {
            // Full url of your login endpoint, must be POST and accepts the following object: { username: string, password: string }
            url: `https://dev.meuencartedigital.com.br/auth/refresh-token`,
            // How you want to handle the errors returned by this endpoint, possible values are 'toast', 'dialog' nad 'none'
            loadingBehavior: 'none',
            // Name of the access token property in the endpoint response
            errorHandlingType: 'toast',
            // How you want to handle the loading state on the store, possible values are 'global', 'local' and 'none'
            responsePropertyName: 'refreshToken',
            // Optional extra properties you can pass to refresh token api for validation. ex: {username: 'name', applicationId:'appId'}
            extraProperties: {[name: string]: string}
        },
        // Array of configuration objects for claims that need to be read from the access token. Please see the authorization section for more details
        accessTokenClaims: {claimName: string, propertyName: string, type: string} []
    },
    state: {
        database: {
            // Function that will be called when logout occurs to reset the database store
            clearFunction: () => ({}),
            // Array of states to be injected in the `database` part of the state
            states: [],
            // Array of actions to be fired in the application initialization to populate the `database` part of the state
            initializationRequiredActions: []
        },
        feature: {
            // Function that will be called when logout occurs to reset the features store
            clearFunction: () => ({}),
            // Array of states to be injected in the `features` part of the state
            states: []
        }
    },
    httpBehaviors: {
        // Default parameters to be used in all HTTP requests on services that inherit from BaseApiService
        defaultParameters: {
            compression: false,
            authentication: true,
            needToRefreshToken: true,
            loadingBehavior: 'global',
            errorHandlingType: 'toast',
            localLoadingTag: null
        },
        // Timeout to wait to fire the application loader after a http request is sent
        loadingStartTimeout: 0
    },
    // Default contiguration for the PrimeNG Toast
    toastConfig: {
        severity: 'success',
        life: 3000,
        sticky: false,
        closable: true,
        successTitle: 'SUCESSO',
        errorTitle: 'ERRO',
        warningTitle: 'AVISO',
        infoTitle: 'INFORMAÇÃO',
    },
    // Default dialog titles
    dialogsConfig: {
        errorDialogTitle: 'ERRO',
        warningDialogTitle: 'ALERTA'
    }
};
```


# 3. Features
## Actions
// TODO: descrever as actions disponíveis (não esquecer login redirect, e extraProperties no login)

## Database state auto initialization
// TODO: explicar sobre o nome as actions
// TODO: explicar sobre o StateUtils

## Authentication and authorization
### Route authentication guard
// TODO: explicar como funciona o guard e como são lidas as roles

### rbkCanAccess pipe
// TODO: explicar

### rbkClaimGuard directive
// TODO: explicar

## Global error handling
// TODO: explicar como as requisicoes tem que vir da API, dialog vs toast, etc

## Loading flag

### Global
    // TODO: explicar

### Local
    // TODO: explicar

## Http request behaviors
// TODO: Falar so BaseApiService e suas configurações

## Title service
// TODO: explicar

## Breadcrum service
// TODO: explicar

## Utility functions
// TODO: listar e explicar

