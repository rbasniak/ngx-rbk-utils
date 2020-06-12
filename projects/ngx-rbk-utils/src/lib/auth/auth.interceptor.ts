// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Injectable, Injector } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap, share } from 'rxjs/operators';
// import { Store } from '@ngxs/store';
// import { AuthHandler } from './auth.handler';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private injector: Injector, private router: Router, private store: Store) { }

//     private inflightAuthRequest: Observable<string> = null;

//     public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (req.headers.get('Authorization') == null) {
//             return next.handle(req);
//         }

//         const authService = this.injector.get(AuthHandler);

//         if (!this.inflightAuthRequest) {
//             this.inflightAuthRequest = authService.getToken().pipe(
//                 share()
//             );
//         }

//         return this.inflightAuthRequest.pipe(
//             switchMap((newToken: string) => {
//                 // unset request inflight
//                 this.inflightAuthRequest = null;

//                 // use the newly returned token
//                 const authReq = req.clone({
//                     headers: req.headers.set('Authorization', newToken ? `Bearer ${newToken}` : null)
//                 });

//                 return next.handle(authReq);
//             }),
//             catchError((error: HttpErrorResponse) => {
//                 // checks if a url is to an admin api or not
//                 if (error.status === 401) {
//                     // check if the response is from the token refresh end point
//                     const isFromRefreshTokenEndpoint = error.url.endsWith('refresh-token');

//                     if (isFromRefreshTokenEndpoint) {
//                         console.error('Problem while trying to automatically refresh the token.');

//                         this.inflightAuthRequest = null;
//                         this.store.dispatch(new GlobalActions.Logout());
//                         return throwError(error);
//                     }

//                     if (!this.inflightAuthRequest) {
//                         this.inflightAuthRequest = authService.refreshToken().pipe(
//                             share()
//                         );

//                         if (!this.inflightAuthRequest) {
//                             // remove existing tokens
//                             this.store.dispatch(new GlobalActions.Logout());
//                             return throwError(error);
//                         }
//                     }

//                     return this.inflightAuthRequest.pipe(
//                         switchMap((newToken: string) => {
//                             this.inflightAuthRequest = null;

//                             // clone the original request
//                             const authReqRepeat = req.clone({
//                                 headers: req.headers.set('Authorization', `Bearer ${newToken}`)
//                             });

//                             // resend the request
//                             return next.handle(authReqRepeat);
//                         })
//                     );
//                 }
//                 else {
//                     throw (error);
//                 }
//             })
//         );
//     }
// }
