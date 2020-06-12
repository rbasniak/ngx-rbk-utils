import { Selector, createSelector } from '@ngxs/store';
import { ApplicationState, ApplicationStateModel } from './application.state';
import { AppStateModel } from '../../app.state';

export class ApplicationSelectors {
    @Selector([ApplicationState])
    public static globalIsLoading(state: ApplicationStateModel): boolean {
        return state.globalIsLoading;
    }

    @Selector([ApplicationState])
    public static isDatabaseStateInitialized(state: ApplicationStateModel): boolean {
        return state.databaseStatesInitialized;
    }

    @Selector([ApplicationState])
    public static isWaitingRequest(tag: string): any {
        return createSelector([ApplicationState], (state: AppStateModel) => {
            return state.global.application.localIsLoading.findIndex(x => x.toLowerCase() === tag) !== -1;
        });
    }
}
