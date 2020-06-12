import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxRbkUtilsConfig } from './ngx-rbk-utils.config';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { TitleService } from './misc/title.service';
import { MessageService } from 'primeng/api';
import { DATABASE_REQUIRED_ACTIONS, DATABASE_STATES } from './state/database/database.state';
import { FEATURE_STATES } from './state/features/features.state';

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
        // For some reason Angular passes 2x through all Decorators, so we set the arrays
        // only when they're empty
        if (FEATURE_STATES.length === 0) {
            FEATURE_STATES.push(...configuration.state.feature.states);
        }

        if (DATABASE_STATES.length === 0) {
            DATABASE_STATES.push(...configuration.state.database.states);
        }

        if (DATABASE_REQUIRED_ACTIONS.length === 0) {
            DATABASE_REQUIRED_ACTIONS.push(...configuration.state.database.initializationRequiredActions);
        }

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

