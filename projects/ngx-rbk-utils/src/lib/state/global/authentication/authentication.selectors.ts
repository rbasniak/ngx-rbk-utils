import { AuthenticationState, AuthenticationStateModel } from './authentication.state';
import { Selector } from '@ngxs/store';

export class AuthenticationSelectors {
    @Selector([AuthenticationState])
    public static accessToken(state: AuthenticationStateModel): string | null {
        return state.accessToken;
    }

    @Selector([AuthenticationState])
    public static refreshToken(state: AuthenticationStateModel): string | null {
        return state.refreshToken;
    }

    @Selector([AuthenticationState])
    public static isAuthenticated(state: AuthenticationStateModel): boolean {
        return !!state.accessToken;
    }
}