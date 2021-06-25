import { createSelector, Selector } from '@ngxs/store';
import { FormGroupConfig } from '../../../ui/dialogs-input-conversion';
import { UiDefinitionsDbState, UiDefinitionsDbStateModel } from './ui-definitions.state';
import { cloneDeep } from 'lodash-es';
// @dynamic
export class UiDefinitionsDbSelectors {
    public static single(entity: string, mode: string): (state: UiDefinitionsDbStateModel) => FormGroupConfig[] {
        return createSelector([UiDefinitionsDbState], (state: UiDefinitionsDbStateModel) => {
            if (mode === 'create') {
                return cloneDeep(state.data[entity].create);
            }
            else if (mode === 'update') {
                return cloneDeep(state.data[entity].update);
            }
            else {
                throw new Error('The only allowed options for "mode" are \'create\' or \'update\'');
            }
        });
    }
}