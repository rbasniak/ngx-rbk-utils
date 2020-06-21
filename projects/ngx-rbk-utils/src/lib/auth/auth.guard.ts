import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { ToastActions } from '../state/global/application/application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Injectable({ providedIn: 'root' })
export class RbkAuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) { }

    public async canActivate(snapshot: ActivatedRouteSnapshot): Promise<boolean> {
        const debug = true;

        if (debug) console.groupCollapsed(`Activating route /${snapshot.routeConfig.path}`);

        let isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

        let result = false;

        if (!isAuthenticated) {
            try {
                if (debug) console.log('[RbkAuthGuard] User not authenticated, trying to login from localstorage...');

                await this.store.dispatch(new AuthenticationActions.LocalLogin()).toPromise();

                isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

                if (!isAuthenticated) {
                    if (debug) console.log('[RbkAuthGuard] Could not login locally using localstorage, redirecting user to landing page');

                    // TODO: setar o endereço da landing page (colocar na store)
                    this.store.dispatch(new Navigate(['/login']));

                    this.store.dispatch(new ToastActions.Error('Usuário não autenticado'));
                }
            }
            catch (ex) {
                if (debug) console.log('[RbkAuthGuard] Error while trying to authenticate the user: ', ex);
            }
        }

        if (isAuthenticated) {
            if (debug) console.log('[RbkAuthGuard] User is authenticated, trying to determine if route needs special claim');

            const routeData = snapshot.routeConfig.data;

            if (routeData != null && routeData.claim != null) {
                if (debug) console.log('[RbkAuthGuard] The selected route needs this claim: ', routeData.claim);

                const allowedClaim = routeData.claim as string;
                result = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(allowedClaim));
            }
            else {
                if (debug) console.log('[RbkAuthGuard] The selected route does not need special claims');

                result = true;
            }
        }

        if (isAuthenticated && !result) {
            this.store.dispatch(new
                ToastActions.Warning('Você não possui autorização para acessar esta rota.'));
        }

        if (debug) console.log('[RbkAuthGuard] Does the user can access this route? -> ', result);
        if (debug) console.groupEnd();

        return result;
    }
}