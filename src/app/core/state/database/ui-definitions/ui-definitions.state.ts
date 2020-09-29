import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AccountDetails } from 'src/app/core/models/accounts';
import { AccountsService } from 'src/app/core/api/accounts.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AccountsManagerActions } from '../../features/accounts-manager/accounts-manager.actions';
import { UiDefinitionsDbActions } from './ui-definitions.actions';
import { UiDefinitionsService } from 'src/app/core/api/ui-defintions.service';

export interface UiDefinitionsDbStateModel {
    lastUpdated: Date;
    data: any;
}

export const getInitialState = (): UiDefinitionsDbStateModel => ({
        lastUpdated: null,
        data: null
    });

@State<UiDefinitionsDbStateModel>({
    name: 'uiDefinitions',
    defaults: getInitialState()
})
@Injectable()
export class UiDefinitionsDbState {
    constructor(private apiService: UiDefinitionsService) { }

    @Action(UiDefinitionsDbActions.LoadAll)
    public loadAll(ctx: StateContext<UiDefinitionsDbStateModel>, action: UiDefinitionsDbActions.LoadAll): Observable<any[]> {
        return this.apiService.all().pipe(
            tap((result: any) => ctx.patchState({
                data: result,
                lastUpdated: new Date()
            }))
        );
    }
}