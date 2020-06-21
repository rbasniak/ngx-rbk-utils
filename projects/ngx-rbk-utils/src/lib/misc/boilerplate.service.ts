import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TitleService } from './title.service';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { DATABASE_REQUIRED_ACTIONS } from '../state/database/database.state';
import { ApplicationActions } from '../state/global/application/application.actions';
import { DatabaseActions } from '../state/database/database.actions';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs';
import { FeaturesActions } from '../state/features/features.actions';

@Injectable({ providedIn: 'root' })
export class BoilerplateService {
    private areDatabaseLoadActionsDispatched = false;
    private listenToDatabaseInitializationEvents = true;
    private subs1: Subscription;
    private subs2: Subscription;
    private subs3: Subscription;

    private nonInitializedDatabaseStates = [];

    constructor(private titleService: TitleService, private store: Store, private rbkConfig: NgxRbkUtilsConfig, private actions$: Actions) { }

    public init(): void {
        this.killSubscriptions();

        this.setNonInitializedStates();

        this.titleService.init();

        this.subs1 = this.actions$.subscribe(dispatchData => {
            if (dispatchData.action.constructor.type === AuthenticationActions.LocalLoginSuccess.type ||
                dispatchData.action.constructor.type === AuthenticationActions.RemoteLoginSuccess.type) {
                if (!this.areDatabaseLoadActionsDispatched) {
                    this.areDatabaseLoadActionsDispatched = true;

                    this.loadDatabaseStoreData();
                }
            }
        });

        this.subs2 = this.actions$.pipe(
            filter(dispatchData => dispatchData.status === 'DISPATCHED'),
            filter(() => this.listenToDatabaseInitializationEvents)
        ).subscribe(dispatchData => {
            if (this.nonInitializedDatabaseStates.length > 0) {
                this.nonInitializedDatabaseStates = this.nonInitializedDatabaseStates.filter(x => x !== dispatchData.action.constructor.type);
            }

            if (this.nonInitializedDatabaseStates.length === 0) {
                console.log('Database stores initialized');
                this.listenToDatabaseInitializationEvents = false;
                this.store.dispatch(new ApplicationActions.DatabaseStatesInitialized());
            }
        });

        this.subs3 = this.actions$.pipe(ofActionDispatched(AuthenticationActions.Logout)).subscribe(() => {
            this.setNonInitializedStates();

            this.store.dispatch(new Navigate([this.rbkConfig.routes.login]));

            this.store.dispatch(new DatabaseActions.Clear()); // TODO: this is NOT clearing the state
            this.store.dispatch(new FeaturesActions.Clear());

            this.listenToDatabaseInitializationEvents = true;

        });
    }

    private loadDatabaseStoreData(): void {
        for (const actionType of DATABASE_REQUIRED_ACTIONS) {
            const actionName: string = actionType.type;
            if (actionName.toLowerCase().indexOf('success') === -1) {
                console.log('Dispatching "', actionType.type, '"');
                const instance = new actionType(null);
                this.store.dispatch(instance);
            }
        }
    }

    private killSubscriptions(): void {
        if (this.subs1 != null) this.subs1.unsubscribe();
        if (this.subs2 != null) this.subs2.unsubscribe();
        if (this.subs3 != null) this.subs3.unsubscribe();
    }

    private setNonInitializedStates(): void {
        this.areDatabaseLoadActionsDispatched = false;
        this.nonInitializedDatabaseStates = DATABASE_REQUIRED_ACTIONS.map(x => x.type);
    }
}