import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from 'ngx-rbk-utils';

@Injectable({providedIn: 'root'})
export class PlaceholderJsonService extends BaseApiService {
    private url = 'https://jsonplaceholder.typicode.com/todos';

    constructor(private httpClient: HttpClient) {
        super();
    }

    public request1(): Observable<any> {
        return this.httpClient.get(this.url, super.generateDefaultHeaders({
            authentication: false,
            errorHandlingType: 'toast',
            loadingBehavior: 'local',
            needToRefreshToken: false,
            localLoadingTag: 'req1'
        }));
    }

    public request2(): Observable<any> {
        return this.httpClient.get<any>(this.url, super.generateDefaultHeaders({
            authentication: false,
            errorHandlingType: 'toast',
            loadingBehavior: 'local',
            needToRefreshToken: false,
            localLoadingTag: 'req2'
        }));
    }

    public request3(): Observable<any> {
        return this.httpClient.get<any>(this.url, super.generateDefaultHeaders({
            authentication: false,
            errorHandlingType: 'toast',
            loadingBehavior: 'local',
            needToRefreshToken: false,
            localLoadingTag: 'req3'
        }));
    }
}