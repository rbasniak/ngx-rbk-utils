import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from 'ngx-rbk-utils';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { TransactionDetails, TransactionUpdate, TransactionCreation } from '../models/transactions';

@Injectable({providedIn: 'root'})
export class TransactionsService extends BaseApiService {
    constructor() {
        super();
    }

    static data = [
        {
            id: '1',
            description: 'Transaction 1',
        },
        {
            id: '2',
            description: 'Transaction 2',
        },
        {
            id: '3',
            description: 'Transaction 3',
        },
        {
            id: '4',
            description: 'Transaction 4',
        },
        {
            id: '5',
            description: 'Transaction 5',
        }
    ];

    public all(): Observable<TransactionDetails[]> {
        return of(TransactionsService.data);
    }

    public create(data: TransactionCreation): Observable<TransactionDetails> {
        return of({
            id: `${TransactionsService.data.length}`,
            description: data.description
        });
    }

    public update(data: TransactionUpdate): Observable<TransactionDetails> {
        return of({
            ...data,
            description: data.description
        });
    }

    public delete(id: string): Observable<void> {
        return of();
    }
}