import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngxs/store';
import { convertFormFeature } from 'ngx-rbk-utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CategoriesDbSelectors } from './core/state/database/categories/categories.selectors';
import { TransactionsDbSelectors } from './core/state/database/transactions/transactions.selectors';
import { AccountsDbSelectors } from './core/state/database/accounts/accounts.selectors';
import { AccountTypesDbSelectors } from './core/state/database/account-types/account-types.selectors';
import { UiDefinitionsDbSelectors } from 'ngx-rbk-utils';
import { SmzDialogsService } from 'ngx-smz-dialogs';

@Component({
    selector: 'demo-dialogs-component',
    templateUrl: './dialogs.component.html',
    styleUrls: ['./dialogs.component.scss']
})

@UntilDestroy()
export class DialogsComponent implements OnInit {
    public dialogsConfig = [];
    constructor(private store: Store, private dialogs: SmzDialogsService) {
    }

    ngOnInit() { }

    load() {
        const teste = this.store.selectSnapshot(x => x.database.uiDefinitions.data);

        for (const key of Object.keys(teste)) {
            const create = this.store.selectSnapshot(UiDefinitionsDbSelectors.single(key, 'create'));
            const update = this.store.selectSnapshot(UiDefinitionsDbSelectors.single(key, 'update'));

            if (create.length > 0) {
                this.dialogsConfig.push({name: key + '-create', data: create});
            }

            if (update.length > 0) {
                this.dialogsConfig.push({name: key + '-update', data: update});
            }
        }
    }

    openDialog(config: any) {
        const data = convertFormFeature(config.data, this.store);

        this.dialogs.open({
            title: config.name,
            features: [
                data
            ],
        });
    }
}