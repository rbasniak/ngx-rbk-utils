import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DatabaseActions } from './database.actions';

export let getDatabaseInitialState = () => ({
});

export const DATABASE_STATES = [];

export const DATABASE_REQUIRED_ACTIONS = [];

@State({
    name: 'database',
    defaults: getDatabaseInitialState(),
    children: DATABASE_STATES
})
@Injectable()
export class DatabaseState {
    @Action(DatabaseActions.Clear)
    public clear(ctx: StateContext<any>): void {
        ctx.patchState({
                ...getDatabaseInitialState()
            }
        );
    }
}