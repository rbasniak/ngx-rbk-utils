import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { ToastActions } from '../state/global/application/application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({ providedIn: 'root' })
export class RbkAuthGuard implements CanActivate {
    constructor(private store: Store) { }

    public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

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

                    this.store.dispatch(new ToastActions.Error('Usuário não autenticado'));

                    return false;
                }
                else {
                    return true;
                }
            }
            catch (ex) {
                return false;
            }
        }
        else {
            const allowedClaim = route.data['claim'] as string;
            const canAccess = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(allowedClaim));

            if (allowedClaim == null || canAccess === true) {
                return true;
            }
            else {

                this.store.dispatch(new
                    ToastActions.Warning('Você não possui autorização para acessar esta rota. Caso necessite acessa-la, entre em contato com seu Supervisor.'));

                // this.store.dispatch(new Navigate([AppRoutes.NO_ACCESS_ERROR_PAGE]));

                return false;
            }
        }
    }
}