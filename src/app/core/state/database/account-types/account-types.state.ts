import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DatabaseStoreStateModel, getInitialDatabaseStoreState } from 'ngx-rbk-utils';
import { SimpleNamedEntity } from 'ngx-smz';
import { AccountTypesService } from 'src/app/core/api/account-types.service';
import { AccountTypesDbActions } from './account-types.actions';
import { AccountDetails } from 'src/app/core/models/accounts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AccountTypesDbStateModel extends DatabaseStoreStateModel<SimpleNamedEntity> {

}

export const getInitialState = () => getInitialDatabaseStoreState<SimpleNamedEntity>();

@State<AccountTypesDbStateModel>({
    name: 'accountTypes',
    defaults: getInitialState()
})
@Injectable()
export class AccountTypesDbState {
    constructor(private apiService: AccountTypesService) { }

    @Action(AccountTypesDbActions.LoadAll)
    public loadAll(ctx: StateContext<AccountTypesDbStateModel>, action: AccountTypesDbActions.LoadAll): Observable<AccountDetails[]> {
        return this.apiService.all().pipe(
            tap((result: AccountDetails[]) => ctx.dispatch(new AccountTypesDbActions.LoadAllSuccess(result)))
        );
    }

    @Action(AccountTypesDbActions.LoadAllSuccess)
    public loadAllSuccess(ctx: StateContext<AccountTypesDbStateModel>, action: AccountTypesDbActions.LoadAllSuccess): void {
        ctx.patchState({
            items: action.data,
            lastUpdated: new Date()
        });
    }
}