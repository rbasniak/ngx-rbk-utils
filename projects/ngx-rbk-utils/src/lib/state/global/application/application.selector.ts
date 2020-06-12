import { Selector } from '@ngxs/store';
import { ApplicationState, ApplicationStateModel } from './application.state';

export class ApplicationSelectors {
    @Selector([ApplicationState])
    public static globalIsLoading(state: ApplicationStateModel): boolean {
        return state.isLoading;
    }

    @Selector([ApplicationState])
    public static isDatabaseStateInitialized(state: ApplicationStateModel): boolean {
        return state.databaseStatesInitialized;
    }
}
