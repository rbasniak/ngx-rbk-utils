import { Injectable } from '@angular/core';
import { CategoryDetails } from 'src/app/core/models/categories';
import { State, Action, StateContext } from '@ngxs/store';
import { DatabaseStoreStateModel, getInitialDatabaseStoreState } from 'ngx-rbk-utils';
import { CategoriesService } from 'src/app/core/api/categories.service';
import { CategoriesDbActions } from './categories.actions';
import { Observable } from 'rxjs/internal/Observable';
import { CategoriesManagerActions } from '../../features/categories-manager/categories-manager.actions';
import { tap } from 'rxjs/operators';
import { replaceArrayItem } from 'ngx-rbk-utils';

export interface CategoriesDbStateModel extends DatabaseStoreStateModel<CategoryDetails> {

}

export const getInitialState = () => getInitialDatabaseStoreState<CategoryDetails>();

@State<CategoriesDbStateModel>({
    name: 'categories',
    defaults: getInitialState()
})
@Injectable()
export class CategoriesDbState {
    constructor(private apiService: CategoriesService) { }

    @Action(CategoriesDbActions.LoadAll)
    public loadAll(ctx: StateContext<CategoriesDbStateModel>, action: CategoriesDbActions.LoadAll): Observable<CategoryDetails[]> {
        return this.apiService.all().pipe(
            tap((result: CategoryDetails[]) => ctx.dispatch(new CategoriesDbActions.LoadAllSuccess(result)))
        );
    }

    @Action(CategoriesDbActions.LoadAllSuccess)
    public loadAllSuccess(ctx: StateContext<CategoriesDbStateModel>, action: CategoriesDbActions.LoadAllSuccess): void {
        ctx.patchState({
            items: action.data,
            lastUpdated: new Date()
        });
    }

    @Action(CategoriesManagerActions.CreateSuccess)
    public create(ctx: StateContext<CategoriesDbStateModel>, action: CategoriesManagerActions.CreateSuccess): void {
        ctx.patchState({
            items: [action.data, ...ctx.getState().items]
        });
    }

    @Action(CategoriesManagerActions.UpdateSuccess)
    public update(ctx: StateContext<CategoriesDbStateModel>, action: CategoriesManagerActions.UpdateSuccess): void {
        ctx.patchState({
            items: replaceArrayItem(ctx.getState().items, action.data)
        });
    }

    @Action(CategoriesManagerActions.DeleteSuccess)
    public delete(ctx: StateContext<CategoriesDbStateModel>, action: CategoriesManagerActions.DeleteSuccess): void {
        ctx.patchState({
            items: [...ctx.getState().items.filter(x => x.id !== action.id)]
        });
    }
}