import { Injectable } from '@angular/core';
import { BaseApiService } from 'ngx-rbk-utils';
import { CategoryDetails, CategoryCreation, CategoryUpdate } from '../models/categories';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CategoriesService extends BaseApiService {
    private url = 'https://jsonplaceholder.typicode.com/comments';

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