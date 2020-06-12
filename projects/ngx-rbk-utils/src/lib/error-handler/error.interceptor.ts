import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
import { ERROR_HANDLING_TYPE_HEADER } from '../http/base-api.service';
import { ApplicationActions } from '../state/global/application/application.actions';
import { ToastActions } from '../state/global/application/application.actions.toast';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const errorHandlingType = request.headers.get(ERROR_HANDLING_TYPE_HEADER);
        if (errorHandlingType === 'none') {
            return next.handle(request);
        }
        else {
            return next.handle(request).pipe(
                tap({
                    error: (err: any) => {
                        let handled = false;

                        if (err instanceof HttpErrorResponse) {
                            // Se a API retornar 302 tem que ter a url relativa no campo error, para usar diretamente no router.
                            // Nesse caso não deve ser tratado como erro normal, por isso o handled para pular o tratamento de
                            // erros em diálogo ou toast
                            if (err.status === 302) {
                                handled = true;
                                this.router.navigate([err.error]);
                            }

                            if (err.status === 400 || err.status === 500) {
                                // Maybe log something here?
                            }
                        }
                        if (!handled) {
                            if (errorHandlingType === 'dialog') {
                                this.store.dispatch(new ApplicationActions.HandleHttpErrorWithDialog(err));
                            }

                            if (errorHandlingType === 'toast') {
                                this.store.dispatch(new ApplicationActions.HandleHttpErrorWithToast(err));
                            }
                        }

                    }
                })
            );
        }
    }
}
