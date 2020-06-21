import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesDbSelectors } from './core/state/database/categories/categories.selectors';
import { TransactionsDbSelectors } from './core/state/database/transactions/transactions.selectors';
import { AccountsDbSelectors } from './core/state/database/accounts/accounts.selectors';
import { AccountTypesDbSelectors } from './core/state/database/account-types/account-types.selectors';

@Component({
    selector: 'demo-super-secret-component',
    templateUrl: './super-secret-route.component.html'
})

@UntilDestroy()
export class SuperSecretRouteComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() { }
}