import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AccountDetails } from 'src/app/core/models/accounts';
import { DatabaseStoreStateModel, getInitialDatabaseStoreState } from 'ngx-rbk-utils';
import { AccountsService } from 'src/app/core/api/accounts.service';
import { tap } from 'rxjs/operators';
import { AccountsDbActions } from './accounts.actions';
import { Observable } from 'rxjs/internal/Observable';
import { AccountsManagerActions } from '../../features/accounts-manager/accounts-manager.actions';
import { replaceArrayItem } from 'ngx-rbk-utils';

export interface AccountsDbStateModel extends DatabaseStoreStateModel<AccountDetails> {

}

export const getInitialState = () => getInitialDatabaseStoreState<AccountDetails>();

@State<AccountsDbStateModel>({
    name: 'accounts',
    defaults: getInitialState()
})
@Injectable()
export class AccountsDbState {
    constructor(private apiService: AccountsService) { }

    @Action(AccountsDbActions.LoadAll)
    public loadAll(ctx: StateContext<AccountsDbStateModel>, action: AccountsDbActions.LoadAll): Observable<AccountDetails[]> {
        return this.apiService.all().pipe(
            tap((result: AccountDetails[]) => ctx.dispatch(new AccountsDbActions.LoadAllSuccess(result)))
        );
    }

    @Action(AccountsDbActions.LoadAllSuccess)
    public loadAllSuccess(ctx: StateContext<AccountsDbStateModel>, action: AccountsDbActions.LoadAllSuccess): void {
        ctx.patchState({
            items: action.data,
            lastUpdated: new Date()
        });
    }

    @Action(AccountsManagerActions.CreateSuccess)
    public create(ctx: StateContext<AccountsDbStateModel>, action: AccountsManagerActions.CreateSuccess): void {
        ctx.patchState({
            items: [action.data, ...ctx.getState().items]
        });
    }

    @Action(AccountsManagerActions.UpdateSuccess)
    public update(ctx: StateContext<AccountsDbStateModel>, action: AccountsManagerActions.UpdateSuccess): void {
        ctx.patchState({
            items: replaceArrayItem(ctx.getState().items, action.data)
        });
    }

    @Action(AccountsManagerActions.DeleteSuccess)
    public delete(ctx: StateContext<AccountsDbStateModel>, action: AccountsManagerActions.DeleteSuccess): void {
        ctx.patchState({
            items: [...ctx.getState().items.filter(x => x.id !== action.id)]
        });
    }
}