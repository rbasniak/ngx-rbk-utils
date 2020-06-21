import { Selector } from '@ngxs/store';
import { AccountDetails } from 'src/app/core/models/accounts';
import { CategoriesDbState, CategoriesDbStateModel } from './categories.state';

export class CategoriesDbSelectors {
    @Selector([CategoriesDbState])
    public static all(state: CategoriesDbStateModel): AccountDetails[] {
        return state.items;
    }
}