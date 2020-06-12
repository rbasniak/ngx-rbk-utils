// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Store } from '@ngxs/store';
// import { Observable } from 'rxjs/internal/Observable';
// import { map, catchError, finalize } from 'rxjs/operators';
// import { throwError } from 'rxjs/internal/observable/throwError';

// @Injectable({
//     providedIn: 'root'
// })
// export class PendingInterceptorService implements HttpInterceptor {
//     private pendingRequests = 0;

//     constructor(private store: Store) {
//     }

//     public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const loadingType = req.headers.get('Loader-Type');

//         if (req.headers.keys().length > 0 && loadingType !== 'Override') {

//             this.pendingRequests++;

//             if (this.pendingRequests === 1) {
//                 setTimeout(() => {
//                     this.store.dispatch(new GlobalActions.StartLoading());
//                 }, 50);
//             }

//             return next.handle(req).pipe(
//                 map(event => {
//                     return event;
//                 }),
//                 catchError(error => {
//                     return throwError(error);
//                 }),
//                 finalize(() => {
//                     this.pendingRequests--;

//                     if (this.pendingRequests === 0) {
//                         setTimeout(() => {
//                             this.store.dispatch(new GlobalActions.StopLoading());
//                         }, 25);
//                     }
//                 })
//             );
//         }
//         else {
//             return next.handle(req);
//         }

//     }
// }