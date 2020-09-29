import { createSelector, Selector } from '@ngxs/store';
import { UiDefinitionsDbState, UiDefinitionsDbStateModel } from './ui-definitions.state';

export class UiDefinitionsDbSelectors {
    @Selector([UiDefinitionsDbState])
    public static single(entity: string, mode: string): (state: UiDefinitionsDbStateModel) => any {
        return createSelector([UiDefinitionsDbState], (state: UiDefinitionsDbStateModel) => {
            return state[entity];
        });
    }
}