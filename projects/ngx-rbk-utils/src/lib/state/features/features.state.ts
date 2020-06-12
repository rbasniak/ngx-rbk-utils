import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeaturesActions } from './features.actions';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';

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
    constructor(private rbkConfig: NgxRbkUtilsConfig) {}
    @Action(FeaturesActions.Clear)
    public clear(ctx: StateContext<any>): void {
        ctx.patchState({
                ...this.rbkConfig.state.feature.clearFunction()
            }
        );
    }
}

export function populateFeatureStates(featureStates: any[]): void {
    // For some reason Angular passes 2x through all Decorators, so we set the array
    // only when it's empty
    if (FEATURE_STATES.length === 0) {
        FEATURE_STATES.push(...featureStates);
    }
}