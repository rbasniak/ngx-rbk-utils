import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { getInitialApplicationState as getApplicationInitialState, ApplicationState } from './application/application.state';
import { getAuthenticationInitialState, AuthenticationState } from './authentication/authentication.state';
import { ApplicationStateModel } from './application/application.state';
import { GlobalActions } from './global.actions';
import { AuthenticationStateModel } from './authentication/authentication.state';

export interface GlobalStateModel {
    application: ApplicationStateModel;
    authentication: AuthenticationStateModel;
}

export const getGlobalInitialState = (): GlobalStateModel => ({
    application: getApplicationInitialState(),
    authentication: getAuthenticationInitialState(),
});

@State<GlobalStateModel>({
    name: 'global',
    defaults: getGlobalInitialState(),
    children: [
        ApplicationState,
        AuthenticationState,
    ]
})
@Injectable()
export class GlobalState {
    @Action(GlobalActions.Clear)
    public clear(ctx: StateContext<GlobalStateModel>, action: GlobalActions.Clear): void {
        ctx.patchState({
                ...getGlobalInitialState()
            }
        );
    }
}