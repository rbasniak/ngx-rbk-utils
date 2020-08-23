import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AccountsManagerActions } from './accounts-manager.actions';
import { Observable } from 'rxjs/internal/Observable';
import { AccountDetails } from 'src/app/core/models/accounts';
import { tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/api/accounts.service';


export interface AccountsManagerStateModel {
}

export const getInitialState = (): AccountsManagerStateModel => ({
    current: null
});

@State<AccountsManagerStateModel>({
    name: 'accountsManager',
    defaults: getInitialState()
})
@Injectable()
export class AccountsManagerState {
    constructor(private apiService: AccountsService) { }


    // @Action(AccountsManagerActions.Create)
    // public create(ctx: StateContext<AccountsManagerStateModel>, action: AccountsManagerActions.Create): Observable<AccountDetails> {
    //     return this.apiService.create(action.data).pipe(
    //         tap((result: AccountDetails) =>
    //             ctx.dispatch(new AccountsManagerActions.CreateSuccess(result)))
    //     );
    // }

    // @Action(AccountsManagerActions.Update)
    // public update(ctx: StateContext<AccountsManagerStateModel>, action: AccountsManagerActions.Update): Observable<AccountDetails> {
    //     return this.apiService.update(action.data).pipe(
    //         tap((result: AccountDetails) =>
    //             ctx.dispatch(new AccountsManagerActions.UpdateSuccess(result)))
    //     );
    // }

    // @Action(AccountsManagerActions.Delete)
    // public delete(ctx: StateContext<AccountsManagerStateModel>, action: AccountsManagerActions.Delete): Observable<void> {
    //     return this.apiService.delete(action.id).pipe(
    //         tap(() =>
    //             ctx.dispatch(new AccountsManagerActions.DeleteSuccess(action.id)))
    //     );
    // }
}