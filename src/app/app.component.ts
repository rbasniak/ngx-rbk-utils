import { Component } from '@angular/core';
import { Store, Actions, ofActionDispatched, Select } from '@ngxs/store';
import { BoilerplateService, AuthenticationActions, fixDates, fixDateProperties, ToastActions, ApplicationSelectors } from 'ngx-rbk-utils';
import { take, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthenticationSelectors } from 'projects/ngx-rbk-utils/src/lib/state/global/authentication/authentication.selectors';
import { PlaceholderJsonService } from './core/api/placeholder.service';
import { Navigate } from '@ngxs/router-plugin';
import { HttpClient } from '@angular/common/http';
import { ApplicationActions } from 'projects/ngx-rbk-utils/src/public-api';

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
  @Select(AuthenticationSelectors.isAuthenticated) public isAuthenticated$: Observable<boolean>;
  title = 'ngx-rbk-demo';
  data: any;

  constructor(private boilerplateService: BoilerplateService, private store: Store, private actions$: Actions,
    private messageService: MessageService, private jsonPlaceholderService: PlaceholderJsonService, private http: HttpClient) {
    this.boilerplateService.init();

    this.http.get('assets/data.json').pipe(
      fixDates(),
    ).subscribe(x => this.data = x);

    this.store.dispatch(new ApplicationActions.SetApplicatinArea('Home'));
  }

  public remoteLoginSuccess(): void {
    this.store.dispatch(new AuthenticationActions.RemoteLogin('free@gmail.com', 'Zemiko987', { extraData1: 'Data1', extraData2: '435', extraData3: 'true' }));

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

  public fixDatesTest(): void {
    const date = new Date(2019, 9, 1);
    // this.data = {
    //   name: 'name',
    //   age: 16,
    //   isSingle: true,
    //   date: date.toUTCString(),
    //   child: {
    //     dateCreated: date.toLocaleString(),
    //     grandchild: [
    //       {
    //         name: 'name 1',
    //         modifiedDate: date.toUTCString(),
    //         deletionDate: 377526933,
    //       },
    //       {
    //         name: 'name 2',
    //         modifiedDate: date.toUTCString(),
    //         deletionDate: 377526933000,
    //       },
    //       {
    //         name: 'name 3',
    //         modifiedDate: date.toUTCString(),
    //         deletionDate: 377526933,
    //       }
    //     ]
    //   }
    // };

    fixDateProperties(this.data);

    // const test = [
    //   { name: 'A' },
    //   { name: 'B' },
    //   { name: 'D' },
    //   { name: 'F' },
    // ];

    // for (const key of Object.keys(test)) {
    //   console.log(key);
    //   console.log(test[key]);
    // }

    console.log(this.data);
  }

  throw(): void {
    throw new Error('WTF JS?!');
  }


}
