import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { throwError, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthHandler {
    private decoder: JwtHelperService;
    constructor(private authService: AuthService, private store: Store, private rbkConfig: NgxRbkUtilsConfig) {
        this.decoder = new JwtHelperService();
    }

    public getToken(): Observable<string | null> {
        const token = this.store.selectSnapshot(AuthenticationSelectors.accessToken);

        const isTokenExpired = this.decoder.isTokenExpired(token);

        if (!isTokenExpired) {
            return of(token);
        }

        return this.refreshToken();
    }

    public refreshToken(): Observable<string | null> {
        if (this.rbkConfig.debugMode) console.groupCollapsed(`Trying to refresh access token`);
        const refreshToken = this.store.selectSnapshot(AuthenticationSelectors.refreshToken);

        if (refreshToken == null) {
            if (this.rbkConfig.debugMode) console.log('[AuthHandler:refreshToken] Refresh token is null in the state');
            if (this.rbkConfig.debugMode) console.groupEnd();
            return of(null);
        }

        return this.authService.refreshToken(refreshToken)
            .pipe(
                map((response: any) => {
                    console.log('[AuthHandler:refreshToken] Access token successfully refreshed');

                    const newAccessToken = response[this.rbkConfig.authentication.login.responsePropertyName];

                    if (newAccessToken == null) {
                        // tslint:disable-next-line:max-line-length
                        console.log(`[AuthHandler:refreshToken] Could not read the ${this.rbkConfig.authentication.login.responsePropertyName} property form the refresh token response`);
                        if (this.rbkConfig.debugMode) console.groupEnd();
                        throw new Error();
                    }

                    console.log('[AuthHandler:refreshToken] Dispatching RemoteLoginSuccess to update the state and localStorage');
                    if (this.rbkConfig.debugMode) console.groupEnd();

                    this.store.dispatch(new AuthenticationActions.RemoteLoginSuccess(newAccessToken, refreshToken));

                    return response.token;
                }),
                catchError(error => {
                    console.log('[AuthHandler:refreshToken] Could not refresh the access token due to API error', error);
                    if (this.rbkConfig.debugMode) console.groupEnd();
                    return throwError(null);
                })
            );
    }
}

