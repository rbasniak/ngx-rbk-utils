export class NgxRbkUtilsConfig {
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
            useGlobalLoading: boolean,
            errorHandlingType: 'toast' | 'dialog' | 'none',
            responsePropertyName: string,
        }
        refreshToken: {
            url: string,
            useGlobalLoading: boolean,
            errorHandlingType: 'toast' | 'dialog' | 'none',
            responsePropertyName: string,
        }
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

    public routes: {
        landing: string,
        login: string
    };
}
