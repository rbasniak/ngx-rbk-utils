import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { CategoriesManagerActions } from './categories-manager.actions';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { CategoryDetails } from 'src/app/core/models/categories';
import { CategoriesService } from 'src/app/core/api/categories.service';


export interface CategoriesManagerStateModel {
}

export const getInitialState = (): CategoriesManagerStateModel => ({
    current: null
});

@State<CategoriesManagerStateModel>({
    name: 'categoriesManager',
    defaults: getInitialState()
})
@Injectable()
export class CategoriesManagerState {
    constructor(private apiService: CategoriesService) { }


    @Action(CategoriesManagerActions.Create)
    public create(ctx: StateContext<CategoriesManagerStateModel>, action: CategoriesManagerActions.Create): Observable<CategoryDetails> {
        return this.apiService.create(action.data).pipe(
            tap((result: CategoryDetails) =>
                ctx.dispatch(new CategoriesManagerActions.CreateSuccess(result)))
        );
    }

    @Action(CategoriesManagerActions.Update)
    public update(ctx: StateContext<CategoriesManagerStateModel>, action: CategoriesManagerActions.Update): Observable<CategoryDetails> {
        return this.apiService.update(action.data).pipe(
            tap((result: CategoryDetails) =>
                ctx.dispatch(new CategoriesManagerActions.UpdateSuccess(result)))
        );
    }

    @Action(CategoriesManagerActions.Delete)
    public delete(ctx: StateContext<CategoriesManagerStateModel>, action: CategoriesManagerActions.Delete): Observable<void> {
        return this.apiService.delete(action.id).pipe(
            tap(() =>
                ctx.dispatch(new CategoriesManagerActions.DeleteSuccess(action.id)))
        );
    }
}