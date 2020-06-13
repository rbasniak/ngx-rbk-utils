import { Selector, createSelector } from '@ngxs/store';
import { AccountsDbState, AccountsDbStateModel } from './accounts.state';
import { AccountDetails } from 'src/app/core/models/accounts';

export class AccountsDbSelectors {
    @Selector([AccountsDbState])
    public static all(state: AccountsDbStateModel): AccountDetails[] {
        return state.items;
    }
}