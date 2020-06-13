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
import { RbkAuthGuard } from './auth/auth.guard';

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
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
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

