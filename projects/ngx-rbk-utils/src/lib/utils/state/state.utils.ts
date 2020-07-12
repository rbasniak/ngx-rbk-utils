import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApplicationSelectors } from '../../state/global/application/application.selector';
import { filter, take } from 'rxjs/operators';

export namespace StateUtils {
    export function afterDatabaseStoreInitialized(store: Store): Observable<boolean> {
        return store.select(ApplicationSelectors.isDatabaseStateInitialized).pipe(
            filter(x => x === true),
            take(1)
        );
    }
}