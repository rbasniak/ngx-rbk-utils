import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

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
        const refreshToken = this.store.selectSnapshot(AuthenticationSelectors.refreshToken);

        if (refreshToken == null) {
            return of(null);
        }

        console.warn('Token expired, trying to refresh it');

        return this.authService.refreshToken(refreshToken)
            .pipe(
                map((response: any) => {
                    console.warn('Token successfully refreshed');

                    const newAccessToken = response[this.rbkConfig.authentication.login.responsePropertyName];

                    if (newAccessToken == null) {
                        throw new Error(`Could not read the ${this.rbkConfig.authentication.login.responsePropertyName} property form the refresh token response`);
                    }

                    // store the new tokens
                    this.store.dispatch(new AuthenticationActions.RemoteLoginSuccess(newAccessToken, refreshToken));

                    return response.token;
                }),
                catchError(error => {
                    console.warn('Couldn\'t refresh the access token');
                    return of(null);
                })
            );
    }
}

