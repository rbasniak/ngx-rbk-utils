import { Injectable } from '@angular/core';
import { BaseApiService } from 'ngx-rbk-utils';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AccountDetails, AccountCreation, AccountUpdate } from '../models/accounts';
import { SimpleNamedEntity } from 'ngx-smz';

@Injectable({providedIn: 'root'})
export class AccountTypesService extends BaseApiService {
    constructor() {
        super();
    }

    static data = [
        {
            id: '1',
            name: 'Account Type 1',
        },
        {
            id: '2',
            name: 'Account Type 2',
        },
        {
            id: '3',
            name: 'Account Type 3',
        },
        {
            id: '4',
            name: 'Account Type 4',
        },
        {
            id: '5',
            name: 'Account Type 5',
        }
    ];

    public all(): Observable<SimpleNamedEntity[]> {
        return of(AccountTypesService.data);
    }

    public create(name: string): Observable<SimpleNamedEntity> {
        return of({
            id: `${AccountTypesService.data.length}`,
            name
        });
    }

    public update(data: AccountUpdate): Observable<AccountDetails> {
        return of({
            ...data,
            name: data.name
        });
    }

    public delete(id: string): Observable<void> {
        return of();
    }
}