import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { NgxRbkUtilsConfig } from './ngx-rbk-utils.config';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TitleService } from './misc/title.service';
import { MessageService } from 'primeng/api';
import { DATABASE_REQUIRED_ACTIONS, DATABASE_STATES } from './state/database/database.state';
import { FEATURE_STATES } from './state/features/features.state';
import { GlobalInjector } from './misc/global.injector';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpErrorInterceptor } from './error-handler/error.interceptor';
import { GlobalPendingInterceptorService } from './http/global.pending.interceptor';
import { LocalPendingInterceptorService } from './http/local.pending.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        TitleService,
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalPendingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalPendingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
    ],
})
export class NgxRbkUtilsModule {
    constructor(injector: Injector) {
        GlobalInjector.instance = injector;
    }

    public static forRoot(configuration: NgxRbkUtilsConfig): ModuleWithProviders<NgxRbkUtilsModule> {
        // For some reason Angular passes 2x through all Decorators, so we set the arrays
        // only when they're empty
        if (FEATURE_STATES.length === 0) {
            const states = [];
            for (const stateName of Object.keys(configuration.state.feature)) {
                states.push(configuration.state.feature[stateName].state);

                if ((configuration.state.feature[stateName].loadAction != null ||
                        configuration.state.feature[stateName].loadAction != null)) {
                    throw new Error(`Invalid state configuration for ` + stateName);
                }
            }
            FEATURE_STATES.push(...states);
        }

        if (DATABASE_STATES.length === 0) {
            const states = [];
            const requiredActions = [];
            for (const stateName of Object.keys(configuration.state.database)) {
                states.push(configuration.state.database[stateName].state);

                if ((configuration.state.database[stateName].loadAction != null &&
                        configuration.state.database[stateName].loadAction == null) ||
                    (configuration.state.database[stateName].loadAction == null &&
                        configuration.state.database[stateName].loadAction != null)) {
                    throw new Error(`Invalid state configuration for ` + stateName);
                }

                if (configuration.state.database[stateName].loadAction != null) {
                    requiredActions.push(configuration.state.database[stateName].loadAction);
                    requiredActions.push(configuration.state.database[stateName].successAction);
                }
            }
            DATABASE_STATES.push(...states);

            if (requiredActions.length > 0) {
                DATABASE_REQUIRED_ACTIONS.push(...requiredActions);
            }
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

