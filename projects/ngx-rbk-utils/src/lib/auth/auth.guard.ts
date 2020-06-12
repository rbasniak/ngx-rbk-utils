import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

@Injectable({ providedIn: 'root' })
export class RbkAuthGuard implements CanActivate {
    constructor(private store: Store, private rbkConfig: NgxRbkUtilsConfig) { }

    public async canActivate(): Promise<boolean> {

        let isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

        if (!isAuthenticated) {
            try {
                console.log('User not authenticated, trying to login from localstorage...');

                await this.store.dispatch(new AuthenticationActions.LocalLogin()).toPromise();

                isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

                if (!isAuthenticated) {
                    console.log('Could not login locally using localstorage, redirecting user to landing page');

                    this.store.dispatch(new Navigate([this.rbkConfig.routes.landing]));

                    return false;
                }
            }
            catch (ex) {

            }
        }

        return isAuthenticated;
    }
}