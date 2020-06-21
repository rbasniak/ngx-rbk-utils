import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ApplicationState } from './application/application.state';
import { AuthenticationState } from './authentication/authentication.state';
import { ApplicationStateModel } from './application/application.state';
import { GlobalActions } from './global.actions';
import { AuthenticationStateModel } from './authentication/authentication.state';

export interface GlobalStateModel {
    application: ApplicationStateModel;
    authentication: AuthenticationStateModel;
}
export const getGlobalInitialState = (): GlobalStateModel => ({
    application: null,
    authentication: null,
});

@State<GlobalStateModel>({
    name: 'global',
    defaults: null,
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