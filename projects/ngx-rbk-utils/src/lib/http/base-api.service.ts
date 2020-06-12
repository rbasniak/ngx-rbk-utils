import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../misc/global.injector';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

export const LOADING_BEHAVIOR_HEADER = 'Loading-Behavior';
export const ERROR_HANDLING_TYPE_HEADER = 'Error-Handling-Type';
export const REFRESH_TOKEN_BEHAVIOR_HEADER = 'Refresh-Token-Behavior';
export const AUTHENTICATION_HEADER = 'Authorization';
export const CONTENT_ENCODING_HEADER = 'Content-Encoding';

export class BaseApiService {
    constructor(protected store: Store) { }

    protected generateDefaultHeaders(parameters: Partial<HttpBehaviorParameters>): { headers: HttpHeaders } {
        let headers = new HttpHeaders();

        const config = GlobalInjector.instance.get(NgxRbkUtilsConfig);

        const defaulValues: HttpBehaviorParameters = {...config.httpBehaviors.defaultParameters};

        const finalParameters = { ...defaulValues, ...parameters };

        if (finalParameters.compression === true) {
            headers = headers.set(CONTENT_ENCODING_HEADER, 'gzip');
        }

        if (finalParameters.authentication === true) {
            // Não pode usar o selector do AuthenticationSelectors por causa de referencia cruzada
            headers = headers.set(AUTHENTICATION_HEADER, 'Bearer ' + this.store.selectSnapshot(x => x.global.authentication.accessToken));
        }

        if (finalParameters.needToRefreshToken === true) {
            headers = headers.set(REFRESH_TOKEN_BEHAVIOR_HEADER, 'true');
        }

        headers = headers.set(LOADING_BEHAVIOR_HEADER, finalParameters.loadingBehavior);

        headers = headers.set(ERROR_HANDLING_TYPE_HEADER, finalParameters.errorHandlingType);

        return { headers };
    }
}

export interface HttpBehaviorParameters {
    compression: boolean;
    authentication: boolean;
    needToRefreshToken: boolean;
    loadingBehavior: 'global' | 'local' | 'none';
    errorHandlingType: 'toast' | 'dialog' | 'none';
}
