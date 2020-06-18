import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeaturesActions } from './features.actions';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';

export const FEATURE_STATES = [];

@State({
    name: 'features',
    defaults: {},
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