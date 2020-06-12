import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxRbkUtilsConfig } from './ngx-rbk-utils.config';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { populateDatabaseStates, populateDatabaseRequiredActions } from './state/database/database.utils';
import { TitleService } from './misc/title.service';
import { MessageService } from 'primeng/api';
import { populateFeatureStates } from './state/features/features.state';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [AuthService, TitleService, MessageService],
})
export class NgxRbkUtilsModule {
    constructor(private store: Store) {
    }

    public static forRoot(configuration: NgxRbkUtilsConfig): ModuleWithProviders<NgxRbkUtilsModule> {
        populateDatabaseStates(configuration.state.database.states);
        populateFeatureStates(configuration.state.feature.states);
        populateDatabaseRequiredActions(configuration.state.database.initializationRequiredActions);

        return {
            ngModule: NgxRbkUtilsModule,
            providers: [
                {
                    provide: NgxRbkUtilsConfig,
                    useValue: configuration
                }
            ]
        };
    }
}

