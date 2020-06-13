import { Injectable } from '@angular/core';
import { BaseApiService } from 'ngx-rbk-utils';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AccountDetails, AccountCreation, AccountUpdate } from '../models/accounts';

@Injectable({providedIn: 'root'})
export class AccountsService extends BaseApiService {
    constructor() {
        super();
    }

    static data = [
        {
            id: '1',
            name: 'Account 1',
        },
        {
            id: '2',
            name: 'Account 2',
        },
        {
            id: '3',
            name: 'Account 3',
        },
        {
            id: '4',
            name: 'Account 4',
        },
        {
            id: '5',
            name: 'Account 5',
        }
    ];

    public all(): Observable<AccountDetails[]> {
        return of(AccountsService.data);
    }

    public create(data: AccountCreation): Observable<AccountDetails> {
        return of({
            id: `${AccountsService.data.length}`,
            name: data.name
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