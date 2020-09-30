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
import { UiDefinitionsDbSelectors } from './core/state/database/ui-definitions/ui-definitions.selectors';

@Component({
    selector: 'app-dialogs-component',
    templateUrl: './dialogs.component.html'
})

@UntilDestroy()
export class DialogsComponent implements OnInit {
    public dialogs = [];
    constructor(private store: Store) {
    }

    ngOnInit() { }

    load() {
        const teste = this.store.selectSnapshot(x => x.database.uiDefinitions.data);

        for (const key of Object.keys(teste)) {
            const create = this.store.selectSnapshot(UiDefinitionsDbSelectors.single(key, 'create'));
            const update = this.store.selectSnapshot(UiDefinitionsDbSelectors.single(key, 'update'));

            if (create.length > 0) {
                this.dialogs.push({name: key + '-create', data: create});
            }

            if (update.length > 0) {
                this.dialogs.push({name: key + '-update', data: update});
            }
        }

        console.log(this.dialogs);
    }
}