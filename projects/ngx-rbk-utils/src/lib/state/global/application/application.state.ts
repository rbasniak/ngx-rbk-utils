import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthenticationActions } from '../authentication/authentication.actions';
import { ApplicationActions } from './application.actions';
import { DATABASE_REQUIRED_ACTIONS } from '../../database/database.state';
import { MessageService } from 'primeng/api';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';
import { ToastActions } from './application.actions.toast';
import { HttpErrorHandler } from '../../../error-handler/error.handler';
import { DynamicDialogsService } from 'ngx-smz';

export interface ApplicationStateModel {
    databaseStatesInitialized: boolean;
    globalIsLoading: boolean;
    localIsLoading: string[];
    isNgRxInitializedOnClient: boolean;
}

// Initial application state, to be used ONLY when the application is starting
export const getInitialApplicationState = (): ApplicationStateModel => {
    return {
        globalIsLoading: false,
        isNgRxInitializedOnClient: false,
        databaseStatesInitialized: false,
        localIsLoading: []
    };
};

// Application state for when the user cleared the state while the application is running,
// NGXS will be already initialized, and all non initialized stores will be reset.
export const getCleanApplicationState = (): ApplicationStateModel => {
    return {
        globalIsLoading: false,
        databaseStatesInitialized: false,
        isNgRxInitializedOnClient: true,
        localIsLoading: []
    };
};

@State<ApplicationStateModel>({
    name: 'application',
    defaults: getInitialApplicationState()
})
@Injectable()
export class ApplicationState {
    constructor(private messageService: MessageService, private rbkConfig: NgxRbkUtilsConfig, private dialogs: DynamicDialogsService) { }

    @Action(ApplicationActions.HandleHttpErrorWithDialog)
    public handleErrorWithDialog$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithDialog): void {
        // ctx.dispatch(new ApplicationActions.StopGlobalLoading());
        const error = HttpErrorHandler.handle(action.error);

        const confirm = {
            validationRequired: false,
            closeDialogAfterClicked: true,
            confirmOnEnter: true,
            isOverlayAction: false,
            icon: '',
            iconPos: '',
            label: 'FECHAR',
            onClick: () => { },
            style: 'primary',
            styleClass: '',
            visible: true
        };

        if (action.error.status >= 400 && action.error.status < 500 ) {
            console.log('show warning dialog, ', error);
            this.dialogs.showMessage({ title: this.rbkConfig.dialogsConfig.errorDialogTitle,
                messages: error.messages,
                closable: false,
                buttons: [{...confirm, style: 'warning' }]
            });
        }
        else {
            this.dialogs.showMessage({ title: this.rbkConfig.dialogsConfig.warningDialogTitle,
                messages: error.messages,
                closable: false,
                buttons: [{...confirm, style: 'danger' }]
            });
        }
    }

    @Action(ApplicationActions.HandleHttpErrorWithToast)
    public handleErrorWithToast$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithToast): void {
        // ctx.dispatch(new ApplicationActions.StopGlobalLoading());

        const error = HttpErrorHandler.handle(action.error);

        for (const message of error.messages) {
            if (action.error.status >= 400 && action.error.status < 500 ) {
                ctx.dispatch(new ToastActions.SendToastWarningMessage(message));
            }
            else {
                ctx.dispatch(new ToastActions.SendToastErrorMessage(message));
            }
        }
    }

    @Action(ApplicationActions.StartGlobalLoading)
    public startLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.StartGlobalLoading): void {
        ctx.patchState({ globalIsLoading: true });
    }

    @Action(ApplicationActions.StopGlobalLoading)
    public stopLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.StopGlobalLoading): void {
        ctx.patchState({ globalIsLoading: false });
    }

    @Action(ApplicationActions.PushLocalLoading)
    public pushLocalLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.PushLocalLoading): void {
        if (ctx.getState().localIsLoading.findIndex(x => x.toLowerCase() !== action.tag) === -1) {
            ctx.patchState({ localIsLoading: [action.tag, ...ctx.getState().localIsLoading ] });
        }
        else {
            // TODO: throw error if the user tries to push the same tag again?
        }
    }

    @Action(ApplicationActions.PopLocalLoading)
    public popLocalLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.PopLocalLoading): void {
        ctx.patchState({ localIsLoading: ctx.getState().localIsLoading.filter(x => x.toLowerCase() !== action.tag) });
    }

    @Action(AuthenticationActions.Logout)
    public logout(ctx: StateContext<ApplicationStateModel>): void {
        ctx.patchState({
            ...getCleanApplicationState()
        });
    }

    @Action(ToastActions.SendToastMessage)
    public showToastMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.SendToastMessage): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            ...action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.SendToastSuccessMessage)
    public showToastSuccessMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.SendToastSuccessMessage): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'success',
            summary: action.title ?? this.rbkConfig.toastConfig.successTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.SendToastErrorMessage)
    public showToastErrorMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.SendToastErrorMessage): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'error',
            summary: action.title ?? this.rbkConfig.toastConfig.errorTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.SendToastInfoMessage)
    public showToastInfoMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.SendToastInfoMessage): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'info',
            summary: action.title ?? this.rbkConfig.toastConfig.infoTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ToastActions.SendToastWarningMessage)
    public showToastWarningMessage(ctx: StateContext<ApplicationStateModel>, action: ToastActions.SendToastWarningMessage): void {
        const message = {
            ...this.rbkConfig.toastConfig,
            severity: 'warn',
            summary: action.title ?? this.rbkConfig.toastConfig.warningTitle,
            detail: action.message
        };

        this.messageService.add(message);
    }

    @Action(ApplicationActions.NgRxInitialized)
    public setRequiredDatabaseActions(ctx: StateContext<ApplicationStateModel>): void {
        ctx.patchState({
            isNgRxInitializedOnClient: true
        });
    }

    @Action(ApplicationActions.DatabaseStatesInitialized)
    public loadAllSuccess$(ctx: StateContext<ApplicationStateModel>): void {
        ctx.patchState({
            databaseStatesInitialized: true,
        });
    }
}
