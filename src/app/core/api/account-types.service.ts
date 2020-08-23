import { Injectable } from '@angular/core';
import { BaseApiService } from 'ngx-rbk-utils';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AccountDetails, AccountUpdate } from '../models/accounts';
import { SimpleNamedEntity } from 'ngx-smz';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AccountTypesService extends BaseApiService {
    private url = 'https://jsonplaceholder.typicode.com/albums';

    constructor(private httpClient: HttpClient) {
        super();
    }

    public all(): Observable<any> {
        return this.httpClient.get(this.url, super.generateDefaultHeaders({
            authentication: false,
            errorHandlingType: 'toast',
            loadingBehavior: 'global',
            needToRefreshToken: false,
        }));
    }
}