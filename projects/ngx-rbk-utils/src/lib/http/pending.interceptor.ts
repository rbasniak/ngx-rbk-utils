import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { LOADING_BEHAVIOR_HEADER } from './base-api.service';
import { ApplicationActions } from '../state/global/application/application.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { finalize } from 'rxjs/internal/operators/finalize';

@Injectable({
    providedIn: 'root'
})
export class PendingInterceptorService implements HttpInterceptor {
    private pendingRequests = 0;

    constructor(private store: Store, private rbkConfig: NgxRbkUtilsConfig) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loadingType = request.headers.get(LOADING_BEHAVIOR_HEADER);

        if (loadingType === 'global') {

            this.pendingRequests++;

            if (this.pendingRequests === 1) {
                setTimeout(() => {
                    // if after a timer there still are pending request ongoing, set the isLoading flag
                    if (this.pendingRequests > 0) {
                        this.store.dispatch(new ApplicationActions.StartGlobalLoading());
                    }
                }, this.rbkConfig.httpBehaviors.loadingStartTimeout);
            }

            return next.handle(request).pipe(
                map(event => {
                    return event;
                }),
                catchError(error => {
                    return throwError(error);
                }),
                finalize(() => {
                    this.pendingRequests--;

                    if (this.pendingRequests === 0) {
                        this.store.dispatch(new ApplicationActions.StopGlobalLoading());
                    }
                })
            );
        }
        else {
            return next.handle(request);
        }
    }
}