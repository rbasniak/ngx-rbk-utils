import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../http/base-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { LoginResponse } from './models';
import { map } from 'rxjs/internal/operators/map';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService {
    constructor(private http: HttpClient, private rbkConfig: NgxRbkUtilsConfig) {
        super();
    }

    public login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<any>(this.rbkConfig.authentication.login.url, { username, password },
            this.generateDefaultHeaders({
                loadingBehavior: this.rbkConfig.authentication.login.loadingBehavior,
                authentication: false,
                errorHandlingType: this.rbkConfig.authentication.login.errorHandlingType,
            })).pipe(
                map(x => ({
                    accessToken: x[this.rbkConfig.authentication.login.responsePropertyName],
                    refreshToken: x[this.rbkConfig.authentication.refreshToken.responsePropertyName]
                })));
    }

    public refreshToken(refreshToken: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.rbkConfig.authentication.refreshToken.url, { refreshToken },
            this.generateDefaultHeaders({
                loadingBehavior: this.rbkConfig.authentication.refreshToken.loadingBehavior,
                authentication: false,
                errorHandlingType: this.rbkConfig.authentication.refreshToken.errorHandlingType,
            })).pipe(
                map(x => ({
                    accessToken: x[this.rbkConfig.authentication.login.responsePropertyName],
                    refreshToken: x[this.rbkConfig.authentication.refreshToken.responsePropertyName]
                })));
    }
}

