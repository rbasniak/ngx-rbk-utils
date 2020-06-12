// import { Injectable, Injector, ErrorHandler } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { Store } from '@ngxs/store';
// import { tap } from 'rxjs/internal/operators/tap';
// import { Observable } from 'rxjs/internal/Observable';

// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//     constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

//     public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const errorHandlingType = request.headers.get('Error-Handling-Type');

//         if (errorHandlingType === 'none') {
//             return next.handle(request);
//         }
//         else {
//             return next.handle(request).pipe(
//                 tap({
//                     error: (err: any) => {
//                         let handled = false;

//                         if (err instanceof HttpErrorResponse) {
//                             // Se a API retornar 302 tem que ter a url relativa no campo error, para usar diretamente no router.
//                             // Nesse caso não deve ser tratado como erro normal, por isso o handled para pular o tratamento de
//                             // erros em diálogo ou toast
//                             if (err.status === 302) {
//                                 handled = true;
//                                 this.router.navigate([err.error]);
//                             }

//                             if (err.status === 400 || err.status === 500) {
//                                 this.logFailedRequest(request);
//                             }
//                         }

//                         if (!handled) {
//                             if (errorHandlingType === 'dialog') {
//                                 this.store.dispatch(new GlobalActions.HandleHttpErrorWithDialog(err));
//                             }

//                             if (errorHandlingType === 'toast') {
//                                 this.store.dispatch(new GlobalActions.HandleHttpErrorWithToast(err));
//                             }
//                         }

//                     }
//                 })
//             );
//         }
//     }
//     private logFailedRequest(request: HttpRequest<any>): void {
//         // console.groupCollapsed('HTTP failed request data');

//         // const user = JSON.parse(localStorage.getItem('dev-user'));
//         // const rolesInfo = JSON.stringify(user.roles);

//         // user.token = '';
//         // user.roles = [];
//         // const userInfo = JSON.stringify(user);

//         // console.error(
//         //   `${request.method} ${request.url.replace(environment.backend, 'https://localhost:44332')}\n\n${userInfo}\n\n${JSON.stringify(request.body)}\n\n${request.headers.get('Authorization').replace('Bearer ', '')}`
//         // );

//         // console.groupEnd();
//     }
// }
