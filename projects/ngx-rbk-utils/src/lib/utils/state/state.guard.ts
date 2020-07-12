import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApplicationSelectors } from '../../state/global/application/application.selector';

@Injectable({ providedIn: 'root' })
export class DatabaseStateGuard implements CanActivate
{
    constructor(private store: Store) { }

    public canActivate(): Observable<boolean>
    {
        return this.store
            .select(ApplicationSelectors.isDatabaseStateInitialized)
            .pipe(filter(x => x === true));
    }

}