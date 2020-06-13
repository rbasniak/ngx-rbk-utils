import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DatabaseStoreStateModel, getInitialDatabaseStoreState } from 'ngx-rbk-utils';
import { TransactionDetails } from 'src/app/core/models/transactions';
import { TransactionsDbActions } from './transactions.actions';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { TransactionsService } from 'src/app/core/api/transactions.service';

export interface TransactionsDbStateModel extends DatabaseStoreStateModel<TransactionDetails> {

}

export const getInitialState = () => getInitialDatabaseStoreState<TransactionDetails>();

@State<TransactionsDbStateModel>({
    name: 'transactions',
    defaults: getInitialState()
})
@Injectable()
export class TrasactionsDbState {
    constructor(private apiService: TransactionsService) { }

    @Action(TransactionsDbActions.LoadAll)
    public loadAll(ctx: StateContext<TransactionsDbStateModel>, action: TransactionsDbActions.LoadAll): Observable<TransactionDetails[]> {
        return this.apiService.all().pipe(
            tap((result: TransactionDetails[]) => ctx.dispatch(new TransactionsDbActions.LoadAllSuccess(result)))
        );
    }

    @Action(TransactionsDbActions.LoadAllSuccess)
    public loadAllSuccess(ctx: StateContext<TransactionsDbStateModel>, action: TransactionsDbActions.LoadAllSuccess): void {
        ctx.patchState({
            items: action.data,
            lastUpdated: new Date()
        });
    }
}