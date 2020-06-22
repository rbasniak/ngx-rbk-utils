import { Component } from '@angular/core';
import { Store, Actions, ofActionDispatched, Select } from '@ngxs/store';
import { BoilerplateService, AuthenticationActions, ToastActions, ApplicationSelectors } from 'ngx-rbk-utils';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthenticationSelectors } from 'projects/ngx-rbk-utils/src/lib/state/global/authentication/authentication.selectors';
import { PlaceholderJsonService } from './core/api/placeholder.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(ApplicationSelectors.globalIsLoading) public globalIsLoading$: Observable<boolean>;
  @Select(ApplicationSelectors.isWaitingRequest('req1')) public localLoadingForRequest1$: Observable<boolean>;
  @Select(ApplicationSelectors.isWaitingRequest('req2')) public localLoadingForRequest2$: Observable<boolean>;
  @Select(ApplicationSelectors.isWaitingRequest('req3')) public localLoadingForRequest3$: Observable<boolean>;
  @Select(ApplicationSelectors.isDatabaseStateInitialized) public databaseStoresOk$: Observable<boolean>;
  @Select(AuthenticationSelectors.isAuthenticated) public isAuthenticated$: Observable<boolean>;
  title = 'ngx-rbk-demo';

  constructor(private boilerplateService: BoilerplateService, private store: Store, private actions$: Actions,
    private messageService: MessageService, private jsonPlaceholderService: PlaceholderJsonService) {
    this.boilerplateService.init();
  }

  public remoteLoginSuccess(): void {
    this.store.dispatch(new AuthenticationActions.RemoteLogin('designer', 'Zuzuga987', { extraData1: 'Data1', extraData2: 435, extraData3: true }));

    this.actions$.pipe(
      ofActionDispatched(AuthenticationActions.RemoteLoginSuccess),
      take(1)).subscribe(x => {
          this.store.dispatch(new ToastActions.Success('Remote login success'));
        });
  }

  public localLoginSuccess(): void {
    this.store.dispatch(new AuthenticationActions.LocalLogin());
    this.actions$.pipe(
      ofActionDispatched(AuthenticationActions.LocalLoginSuccess),
      take(1)).subscribe(x => {
          this.store.dispatch(new ToastActions.Success('Local login success'));
        });
  }

  public remoteLoginFailure(): void {
    this.store.dispatch(new AuthenticationActions.RemoteLogin('free@gmail.com', 'Zemiko987a'));
  }

  public logout(): void {
    this.store.dispatch(new AuthenticationActions.Logout());
  }

  public request1(): void {
    this.jsonPlaceholderService.request1().subscribe(x => this.store.dispatch(new ToastActions.Success('Request 1 handled with success')));
  }

  public request2(): void {
    this.jsonPlaceholderService.request2().subscribe(x => this.store.dispatch(new ToastActions.Success('Request 2 handled with success')));
  }

  public request3(): void {
    this.jsonPlaceholderService.request3().subscribe(x => this.store.dispatch(new ToastActions.Success('Request 3 handled with success')));
  }

  public goToSecretRoute(): void {
    this.store.dispatch(new Navigate(['/secret']));
  }

  public goToHomeRoute(): void {
    this.store.dispatch(new Navigate(['/']));
  }

  public goToTopSecretRoute(): void {
    this.store.dispatch(new Navigate(['/secret/top-secret']));
  }

  public goToLeakedRoute(): void {
    this.store.dispatch(new Navigate(['/secret/leaked-secret']));
  }


}
