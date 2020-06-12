import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DatabaseActions } from './database.actions';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';

export const DATABASE_STATES: any[] = [];

export const DATABASE_REQUIRED_ACTIONS = [];

export let getDatabaseInitialState = () => ({});

@State({
    name: 'database',
    defaults: getDatabaseInitialState(),
    children: DATABASE_STATES
})
@Injectable()
export class DatabaseState {
    constructor(private rbkConfig: NgxRbkUtilsConfig) { }
    @Action(DatabaseActions.Clear)
    public clear(ctx: StateContext<any>): void {
        ctx.patchState({
            ...this.rbkConfig.state.database.clearFunction()
        });
    }
}