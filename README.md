# 1. Setup

* Install and setup all dependencies needed by the library
    * [primeng](https://www.npmjs.com/package/primeng)
    * [ngx-smz](https://www.npmjs.com/package/ngx-smz)
    * [@ngxs/store](https://www.npmjs.com/package/@ngxs/store)
    * [@ngxs/router-plugin](https://www.npmjs.com/package/@ngxs/router-plugin)
    * [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)

* Install the library

        `npm install ngx-rbk-utils`

* Import the `NgxRbkUtilsModule` in your `AppModule` and pass the `buildState()` function in the `NgxsModule.forRoot()` method. Also import the `ToastModule` from `primeng`. Also add a provider for `NgxRbkUtilsConfig`

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
    providers: [{ provide: NgxRbkUtilsConfig, useValue: rbkConfig }],
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
* Stil in `AppModule`, define the following as provider:

  ```typescript
    providers: [{ provide: NgxRbkUtilsConfig, useValue: rbkConfig }
  ```
  Obs: This is required for injection of NgxRbkUtilsConfig into auth.guard

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

* Make sure you don't import `MessageService` from `primeng` in any of modules/components or the `ToastActions` from the library will not work

* In the constructor of your error page, clear the local storage with (or at least clear the properties that store the accessToken and the refreshTokemn):
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

The library uses many internal `NGXS` actions and exposes a series of them to the user. The following list constains the actions of the library, organized by namespace:

---

#### DatabaseActions

* `Clear`: cleans the `DatabaseStore`, using the callbacks specified in the config file.

> This actions is automatically called when the `ApplicationActions.Logout` action is dispatched

---

#### FeatureActions

* `Clear`: cleans the `FeatureStore`, using the callbacks specified in the config file.

> This actions is automatically called when the `ApplicationActions.Logout` action is dispatched

---

### AuthenticationActions

> The `RemoteLogin` and `Logout` actions should be manually fired by the client application.

* `RemoteLogin`: this action should be fired by the client application when the user clicks a LOGIN button. It will fire the login http request using the parameters of the config file. If this succeeds the `RemoteLoginSuccess` actions is dispatched. If it fails the error is handled either by showing a dialog with the error or a toast as set in the config file. The config section of the login request in the config file allows the user to pass extra static parameters with the login http request.

* `Logout`: this action should be manually dispatched when the user sign out.

> The following actions are automatically dispatched inside the library, in common use cases there is no need to dispatch or handle them:

* `LocalLogin`: when this action is dispatched the library tries to authenticate using the access token in the browser local storage.

* `LocalLoginSuccess`: this action is dispatched when the library successfully authenticate the user using the data stored in the local storage. This action automatically starts the process of loading the database stores from your API.

* `LocalLoginFailure`: this action is dispatched when the library failed to authenticate using the data in the local storage.

* `RemoteLoginSuccess`: this actions is dispatched when the login http resquests returns `200` and it automatically dispatched a `Navigate` action to the `authenticatedRoot` route path in the config file.

* `RefreshTokenSuccess`: this action is dispatched everytime an access token is successfully refreshed.

---

### ApplicationActions

`IMPORTANT`: these actions are not meant to be dispatched by the client application, they are for internal use only. But since they will show in the Redux Dev Tools, they will be described here.

* `HandleHttpErrorWithDialog`: this action is dispatched when an error handling flag in the config file set to `dialog`.

* `HandleHttpErrorWithToast`: this action is dispatched when an error handling flag in the config file set to `toast`.

* `StartGlobalLoading`: this action is dispatched when an http request is fired with the loading behavior flag set to `global` nad no other request is in progress.

* `StopGlobalLoading`: this action is dispatched when the last http request in progress is finished.

* `NgRxInitialized`: this actions is dispatched to flag when `NGXS` is initialized in the client application.

* `DatabaseStatesInitialized`: this action is dispatched when all actions in the `initializationRequiredActions` property are dispatched.

* `PushLocalLoading`: this action is dispatched when an http request is started with the loading behavior flag set to `toast`

* `PopLocalLoading`: this action is dispatched when an http request with the loading behavior flag set to `toast` is finished

---

## Selectors

The library automatically creates the `global` piece of the store containing application and authentication related data. To use this data the user manually query the store or use the selectors already exposed by the library:

### AuthenticationSelectors

* `accessToken`: returns the access token as `string`

* `refreshToken`: returns the refresh token as `string`

* `isAuthenticated`: returns true if the user is authenticated

* `userdata`: return the whole object constructed using the JWT token data. Since its properties are dynamic (set in the config file) this selector returns an object of type `any` and should be cast to your user model as can be seen in the example below.

    ```typescript
    const data = this.store.selectSnapshot(AuthenticationSelectors.userdata) as MyUserModel
    ```

* `username`: returns the name of user as it is in the JWT access token in the claim, but only if a property `username` is setup in the `accessTokenClaims` property in the config file.

* `hasGroupOfClaimAccess`: receives an array of claims and returns true if the user has all claims in its access token. The claims can have a domain or not. More details in the `Claims Domain` section

* `hasClaimAccess`: receives a claim and returns true if the user has this claim in its access token. The claim can have a domain or not. More details in the `Claims Domain` section

---

### ApplicationSelectors

* `globalIsLoading`: returns true if there is any http request (using the `global` in the loading behavior flag) in progress.

* `isDatabaseStateInitialized`: returns true if all pieces of the `database` store are initialized.

* `isWaitingRequest`: receives a string containing a local loading http tag and returns true if there is any http request with this tag in progress.

---

## Database state auto initialization

One of the main features of this library is to easy the burden of loading shared store (called as database stores here) and knowing if their data is already loaded.

In the concept of database stores all data that should be readibly available to the application and shared between components should be loaded at application initialization.

This way all this loading is centralized in a single part of the code and you don't have to manually fire their load actions in multiple parts of the code.

This approach works very well and make the user experience very fluid since most data is already in the memory. This is specially true for data that is used to populate dropdowns.

The biggest problem with this approach is when the users enters your application using a route that needs this data to render something. If this happens, Angular will load the component before the data arrive from the backend and you're using `selectSnapshot` instead of `select` from NGXS.

In many cases the `select` is an overkill since it returns an `Observable` and it's a lot easier to work directly with the results of a variable. This is specially true for the contents of dropdown or lists. For this reason we prefer to use the `selectSnapshot` feature of NGXS, but this gets the state of the store in the moment it was called and it's never updated again. So we need to be sure to call it only we are sure that the data is loaded in the store.

To solve this problem the library exposes a helper method called `afterDatabaseStoreInitialized` that returns an `Observable<boolean>` so the component can know when to start using the data from the store or the application can use a route guard called `RbkDatabaseStateGuard` that will allow Angular to navigate to that route only when the database store is populated.

We prefer the route approach, because you don't have to bother with anything in your component, when Angular reaches it you can be 100% sure that all database stores are ready.

If the route guard approach doesn't work in your case, the following sample shows how to use it:

```typescript
constructor(private route: ActivatedRoute, private store: Store) {
    StateUtils.afterDatabaseStoreInitialized(store).pipe(
        tap(() => {
            // You can use .selectSnapshot now
        })
    ).subscribe();
}
```
---

## Authentication and authorization
### Route authentication guard
The library provides an authentication route guard called `RbkAuthGuard`.

The checks made by the guard are the following:

* if the route does not need any special claim, return the value in the `AuthenticationSelectors.isAuthenticated` selector

* if the route needs any special claim, it should be passed to the router like this:

```typescript
const routes: Routes = [
  {
    path: 'authenticated-route',
    component: AuthenticatedRouteComponent,
    canActivate: [ RbkAuthGuard ],
    data: { title: 'My Route', breadcrumb: 'My Route', claim: 'CAN_ACCESS_MY_AUTHENTICATED_ROUTE' },
    children: [
      ...
    ]
  },
];
```
* when the route needs any special claim, the guard will search for that claim in the user data, if the user is authenticated and he has the needed claim the access is allowed.

* when the route needs any special claim and the guard doesn't find that claim directly in the user data, it will try to find a claim in the format `{{domain}}|{{claim}}`. The domain is read from the `domain` property in the user data. If you need to use this domain feature, you need to set it in the `accessTokenClaims` property in the config file.

---

### rbkCanAccess pipe

This pipe is used to restrict access of HTML components using `*ngIf`. For instance, the following sample renders the `div` only if the user has the `IS_ADMIN` claim in the JWT token.

```typescript
export class MyComponent {
  public isAdminClaim = 'IS_ADMIN';

  constructor() {
  }
}
```

```html
<div *ngIf="!(isAdminClaim | rbkCanAccess)">
</div>
```

---

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

