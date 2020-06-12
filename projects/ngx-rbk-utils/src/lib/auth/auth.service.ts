import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../http/base-api.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { of } from 'rxjs/internal/observable/of';
import { LoginResponse } from './models';
import { map } from 'rxjs/internal/operators/map';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService {
    constructor(private http: HttpClient, store: Store, private rbkConfig: NgxRbkUtilsConfig) {
        super(store);
    }

    public login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<any>(this.rbkConfig.authentication.login.url, { username, password },
            this.generateDefaultHeaders({
                loaderOverride: this.rbkConfig.authentication.login.useGlobalLoading,
                authentication: false,
                errorHandlerType: this.rbkConfig.authentication.login.errorHandlingType,
            })).pipe(
                map(x => ({
                    accessToken: x[this.rbkConfig.authentication.login.responsePropertyName],
                    refreshToken: x[this.rbkConfig.authentication.refreshToken.responsePropertyName]
                })));
    }

    public refreshToken(refreshToken: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.rbkConfig.authentication.refreshToken.url, { refreshToken },
            this.generateDefaultHeaders({
                loaderOverride: this.rbkConfig.authentication.refreshToken.useGlobalLoading,
                authentication: false,
                errorHandlerType: this.rbkConfig.authentication.refreshToken.errorHandlingType,
            })).pipe(
                map(x => ({
                    accessToken: x[this.rbkConfig.authentication.login.responsePropertyName],
                    refreshToken: x[this.rbkConfig.authentication.refreshToken.responsePropertyName]
                })));
    }
}

