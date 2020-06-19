import { Component, OnInit } from '@angular/core';
import { StateUtils, ApplicationSelectors } from 'ngx-rbk-utils';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import { ToastActions } from 'ngx-rbk-utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesDbSelectors } from './core/state/database/categories/categories.selectors';
import { TransactionsDbSelectors } from './core/state/database/transactions/transactions.selectors';
import { AccountsDbSelectors } from './core/state/database/accounts/accounts.selectors';
import { AccountTypesDbSelectors } from './core/state/database/account-types/account-types.selectors';

@Component({
    selector: 'demo-secret-component',
    templateUrl: './secret-route.component.html'
})

@UntilDestroy()
export class SecretRouteComponent implements OnInit {
    constructor(private route: ActivatedRoute, private store: Store) {
        StateUtils.afterDatabaseStoreInitialized(store).pipe(
            tap(() => {
                // if for demonstration purposes only, in practice, this observable will only emit
                // when the stores are completely initialized
                if (this.store.selectSnapshot(CategoriesDbSelectors.all).length > 0 &&
                    this.store.selectSnapshot(TransactionsDbSelectors.all).length > 0 &&
                    this.store.selectSnapshot(AccountsDbSelectors.all).length > 0 &&
                    this.store.selectSnapshot(AccountTypesDbSelectors.all).length > 0) {

                    this.store.dispatch(new ToastActions.Info('States are initialized! Go ahead and have fun'));
                }
            })
        ).subscribe();
    }

    ngOnInit() { }
}