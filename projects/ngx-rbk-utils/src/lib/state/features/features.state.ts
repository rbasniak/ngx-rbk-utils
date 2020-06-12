import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeaturesActions } from './features.actions';

export let getFeaturesInitialState = () => ({
});

export const FEATURE_STATES = [];

@State({
    name: 'features',
    defaults: getFeaturesInitialState(),
    children: FEATURE_STATES
})
@Injectable()
export class FeaturesState {
    @Action(FeaturesActions.Clear)
    public clear(ctx: StateContext<any>): void {
        ctx.patchState({
                ...getFeaturesInitialState()
            }
        );
    }
}

export function populateFeatureStates(featureStates: any[]): void {
    FEATURE_STATES.push(...featureStates);
}