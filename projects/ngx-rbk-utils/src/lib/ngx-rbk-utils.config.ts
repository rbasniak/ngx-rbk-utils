import { HttpBehaviorParameters } from './http/base-api.service';

export class NgxRbkUtilsConfig {
    public debugMode: boolean;
    public applicationName: string;

    public state: {
        database: {
            states: any[],
            initializationRequiredActions: any[],
            clearFunction: () => {}
        },
        feature: {
            states: any[],
            clearFunction: () => {}
        }
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
        login: string
    };
}
