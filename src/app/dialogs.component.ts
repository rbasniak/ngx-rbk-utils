import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import { ToastActions } from 'ngx-rbk-utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CategoriesDbSelectors } from './core/state/database/categories/categories.selectors';
import { TransactionsDbSelectors } from './core/state/database/transactions/transactions.selectors';
import { AccountsDbSelectors } from './core/state/database/accounts/accounts.selectors';
import { AccountTypesDbSelectors } from './core/state/database/account-types/account-types.selectors';

@Component({
    selector: 'app-dialogs-component',
    templateUrl: './dialogs.component.html'
})

@UntilDestroy()
export class DialogsComponent implements OnInit {
    constructor(private store: Store) {
    }

    ngOnInit() { }
}