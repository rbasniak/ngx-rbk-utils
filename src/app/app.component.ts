import { Component, ViewChild } from '@angular/core';
import { Store, Actions, ofActionDispatched, Select } from '@ngxs/store';
import { BoilerplateService, AuthenticationActions, ToastActions, ApplicationSelectors } from 'ngx-rbk-utils';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationSelectors } from 'projects/ngx-rbk-utils/src/lib/state/global/authentication/authentication.selectors';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(ApplicationSelectors.globalIsLoading) public globalIsLoading$: Observable<boolean>;
  @Select(ApplicationSelectors.isDatabaseStateInitialized) public databaseStoresOk$: Observable<boolean>;
  @Select(AuthenticationSelectors.isAuthenticated) public isAuthenticated$: Observable<boolean>;
  title = 'ngx-rbk-demo';

  constructor(private boilerplateService: BoilerplateService, private store: Store, private actions$: Actions,
    private messageService: MessageService) {
    this.boilerplateService.init();
  }

  public remoteLoginSuccess(): void {
    this.store.dispatch(new AuthenticationActions.RemoteLogin('free@gmail.com', 'Zemiko987'));
    this.actions$.pipe(
      ofActionDispatched(AuthenticationActions.RemoteLoginSuccess),
      take(1)).subscribe(x => {
          this.store.dispatch(new ToastActions.SendToastSuccessMessage('Remote login success'));
        });
  }

  public localLoginSuccess(): void {
    this.store.dispatch(new AuthenticationActions.LocalLogin());
    this.actions$.pipe(
      ofActionDispatched(AuthenticationActions.LocalLoginSuccess),
      take(1)).subscribe(x => {
          this.store.dispatch(new ToastActions.SendToastSuccessMessage('Local login success'));
        });
  }

  public remoteLoginFailure(): void {
    this.store.dispatch(new AuthenticationActions.RemoteLogin('free@gmail.com', 'Zemiko987a'));
  }

  public logout(): void {
    this.store.dispatch(new AuthenticationActions.Logout());
  }
}
