import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';

export class BaseApiService {
    constructor(protected store: Store) { }

    protected generateDefaultHeaders(parameters: Partial<HttpBehaviorOverrideParameters>): { headers: HttpHeaders } {
        let headers = new HttpHeaders();

        const defaulValues: HttpBehaviorOverrideParameters = {
            authentication: true,
            compression: false,
            loaderOverride: false,
            errorHandlerType: 'dialog',
        };

        const finalParameters = { ...defaulValues, ...parameters };

        headers = headers.set('Default-Behavior', 'Intercept');

        if (finalParameters.loaderOverride === true) {
            headers = headers.set('Loader-Type', 'Override');
        }

        headers = headers.set('Error-Handling-Type', finalParameters.errorHandlerType == null
            ? 'dialog'
            : finalParameters.errorHandlerType);

        if (finalParameters.compression === true) {
            headers = headers.set('Content-Encoding', 'gzip');
        }

        if (finalParameters.authentication === true) {
            // headers = headers.set('Authorization', 'Bearer ' + this.store.selectSnapshot(RbkInfrastructureConfig.tokenSelector));
        }

        return { headers };
    }
}

export interface HttpBehaviorOverrideParameters {
    compression: boolean;
    loaderOverride: boolean;
    authentication: boolean;
    errorHandlerType: 'toast' | 'dialog' | 'none';
}
