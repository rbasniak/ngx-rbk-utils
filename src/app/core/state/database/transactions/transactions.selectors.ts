import { Selector } from '@ngxs/store';
import { TransactionsDbStateModel, TrasactionsDbState } from './transactions.state';
import { TransactionDetails } from 'src/app/core/models/transactions';

export class TransactionsDbSelectors {
    @Selector([TrasactionsDbState])
    public static all(state: TransactionsDbStateModel): TransactionDetails[] {
        return state.items;
    }
}