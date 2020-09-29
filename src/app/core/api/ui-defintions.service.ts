import { Injectable } from '@angular/core';
import { BaseApiService } from 'ngx-rbk-utils';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AccountDetails, AccountCreation, AccountUpdate } from '../models/accounts';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UiDefinitionsService extends BaseApiService {
    private url = 'assets/dialogs.json';

    constructor(private httpClient: HttpClient) {
        super();
    }

    public all(): Observable<any> {
        console.log('service');
        return this.httpClient.get(this.url, super.generateDefaultHeaders({
            authentication: false,
            errorHandlingType: 'toast',
            loadingBehavior: 'global',
            needToRefreshToken: false,
        }));
    }
}