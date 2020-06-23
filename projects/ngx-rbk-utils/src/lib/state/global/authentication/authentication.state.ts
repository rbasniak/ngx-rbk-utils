import { Injectable } from '@angular/core';
import { Store, State, Action, StateContext } from '@ngxs/store';
import { AuthenticationActions } from './authentication.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { isEmpty } from '../../../utils/utils';
import { Navigate } from '@ngxs/router-plugin';
import { LoginResponse } from '../../../auth/models';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';
import { generateUserData } from './authentication.utils';

// If access token path or property name is changed, don't forget to update the
// selectSnapshot to it on BaseApiService
export interface AuthenticationStateModel {
    accessToken: string | null;
    refreshToken: string | null;
    userdata: any;
}

export const getAuthenticationInitialState = (): AuthenticationStateModel => ({
    accessToken: null,
    refreshToken: null,
    userdata: null,
});

// Do not remove the @dynamic flag, it's not a comment, it an Angular flag!
// @dynamic
@State<AuthenticationStateModel>({
    name: 'authentication',
    defaults: getAuthenticationInitialState()
})
@Injectable()
export class AuthenticationState {
    constructor(private authService: AuthService, private store: Store, private rbkConfig: NgxRbkUtilsConfig) { }

    @Action(AuthenticationActions.LocalLogin)
    public localLogin(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.LocalLogin): void {
        if (this.rbkConfig.debugMode) console.log(`[Authentication State] Handling LocalLogin`);
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (isEmpty(accessToken)) {
            ctx.dispatch(new AuthenticationActions.LocalLoginFailure());
        }
        else {
            ctx.patchState({
                accessToken,
                refreshToken,
                userdata: generateUserData(accessToken, this.rbkConfig)
            });

            ctx.dispatch(new AuthenticationActions.LocalLoginSuccess());
        }
    }

    @Action(AuthenticationActions.LocalLoginFailure)
    public localLoginFailure(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.LocalLoginFailure): void {
        // TODO: se nao der erro, retirar isso no futuro
        // ctx.dispatch(new Navigate([this.rbkConfig.routes.nonAuthenticatedRoot]));
    }

    @Action(AuthenticationActions.RemoteLogin)
    public remoteLogin(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.RemoteLogin): Observable<LoginResponse> {
        return this.authService.login(action.username, action.password, action.extraProperties).pipe(
            tap((result: LoginResponse) => {
                this.store.dispatch(new AuthenticationActions.RemoteLoginSuccess(result.accessToken, result.refreshToken));
            })
        );
    }

    @Action(AuthenticationActions.RemoteLoginSuccess)
    public remoteLoginSuccess(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.RemoteLoginSuccess): void {
        if (this.rbkConfig.debugMode) console.log(`[Authentication State] Handling RemoteLoginSuccess`);
        localStorage.setItem('access_token', action.accessToken);
        localStorage.setItem('refresh_token', action.refreshToken);

        ctx.patchState({
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
            userdata: generateUserData(action.accessToken, this.rbkConfig)
        });
    }

    @Action(AuthenticationActions.LocalLoginSuccess)
    public localLoginSuccess(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.LocalLoginSuccess): void {
        if (this.rbkConfig.debugMode) console.log(`[Authentication State] Handling LocalLoginSuccess`);
    }

    @Action(AuthenticationActions.Logout)
    public logout(ctx: StateContext<AuthenticationStateModel>): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        ctx.setState({
            accessToken: null,
            refreshToken: null,
            userdata: null
        });
    }
}