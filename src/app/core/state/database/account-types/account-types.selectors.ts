import { Selector } from '@ngxs/store';
import { SimpleNamedEntity } from 'ngx-smz';
import { AccountTypesDbStateModel, AccountTypesDbState } from './account-types.state';

export class AccountTypesDbSelectors {
    @Selector([AccountTypesDbState])
    public static all(state: AccountTypesDbStateModel): SimpleNamedEntity[] {
        return state.items;
    }
}