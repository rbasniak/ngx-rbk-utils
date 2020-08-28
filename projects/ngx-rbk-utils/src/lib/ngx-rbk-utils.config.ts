import { HttpBehaviorParameters } from './http/base-api.service';

export class NgxRbkUtilsConfig {
    public debugMode: boolean;
    public applicationName: string;
    public useTitleService?: boolean;
    public state: {
        database: {[name: string]: DatabaseStateParameters},
        feature: {[name: string]: DatabaseStateParameters}
    };
    public authentication: {
        login: {
            url: string,
            loadingBehavior: 'global' | 'local' | 'none',
            errorHandlingType: 'toast' | 'dialog' | 'none',
            responsePropertyName: string, // this is used in the login and refresh token endpoint responses
        },
        refreshToken: {
            url: string,
            loadingBehavior: 'global' | 'local' | 'none',
            errorHandlingType: 'toast' | 'dialog' | 'none',
            responsePropertyName: string, // this is used in the login and refresh token endpoint responses
            extraProperties?: {[name: string]: string},
        },
        accessTokenClaims?: { claimName: string, propertyName: string, type: 'string' | 'array' } []
    };
    public httpBehaviors: {
        defaultParameters: HttpBehaviorParameters,
        loadingStartTimeout: number
    };
    public toastConfig: {
        severity: string,
        life: number,
        sticky: boolean,
        closable: boolean,
        successTitle: string,
        warningTitle: string,
        errorTitle: string,
        infoTitle: string,
    };
    public dialogsConfig: {
        errorDialogTitle: string,
        warningDialogTitle: string
    };
    public routes: {
        authenticatedRoot: string,
        nonAuthenticatedRoot: string,
        login: string,
        error: string
    };
}

export interface DatabaseStateParameters {
    state: any;
    loadAction?: any;
    successAction?: any;
    clearFunction: () => {};
    cacheTimeout?: number;
}
