import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate } from '@angular/router';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { ToastActions } from '../state/global/application/application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({ providedIn: 'root' })
export class RbkAuthGuard implements CanActivate {
    constructor(private store: Store, private injector: Injector) { }

    public async canActivate(): Promise<boolean> {

        let isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

        if (!isAuthenticated) {
            try {
                console.log('User not authenticated, trying to login from localstorage...');

                await this.store.dispatch(new AuthenticationActions.LocalLogin()).toPromise();

                isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

                if (!isAuthenticated) {
                    console.log('Could not login locally using localstorage, redirecting user to landing page');

                    // TODO: setar o endereço da landing page (colocar na store)
                    this.store.dispatch(new Navigate(['/login']));

                    this.store.dispatch(new ToastActions.SendToastErrorMessage('Usuário não autenticado'));

                    return false;
                }
            }
            catch (ex) {

            }
        }

        return isAuthenticated;
    }
}