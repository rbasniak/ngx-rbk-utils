import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthenticationActions } from '../authentication/authentication.actions';
import { ApplicationActions } from './application.actions';
import { DATABASE_REQUIRED_ACTIONS } from '../../database/database.state';
import { MessageService } from 'primeng/api';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';
import { ToastActions } from './application.actions.toast';

export interface ApplicationStateModel {
    databaseStatesInitialized: boolean;
    isLoading: boolean;
    isNgRxInitializedOnClient: boolean;
}

// Initial application state, to be used ONLY when the application is starting
export const getInitialApplicationState = (): ApplicationStateModel => {
    return {
        isLoading: false,
        isNgRxInitializedOnClient: false,
        databaseStatesInitialized: false
    };
};

// Application state for when the user cleared the state while the application is running,
// NGXS will be already initialized, and all non initialized stores will be reset.
export const getCleanApplicationState = (): ApplicationStateModel => {
    return {
        isLoading: false,
        databaseStatesInitialized: false,
        isNgRxInitializedOnClient: true
    };
};

@State<ApplicationStateModel>({
    name: 'application',
    defaults: getInitialApplicationState()
})
@Injectable()
export class ApplicationState {
    // constructor(private dialogs: DynamicDialogsService) { }
    constructor(private messageService: MessageService, private rbkConfig: NgxRbkUtilsConfig) { }

    // @Action(ApplicationActions.HandleHttpErrorWithDialog)
    // public handleErrorWithDialog$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithDialog): void {
    //     ctx.dispatch(new ApplicationActions.StopGlobalLoading());

    //     const error = HttpErrorHandler.handle(action.error);

    //     const cancel: IDialogActionButton = {
    //         validationRequired: false,
    //         closeDialogAfterClicked: true,
    //         isOverlayAction: false,
    //         icon: '',
    //         iconPos: '',
    //         label: 'FECHAR',
    //         onClick: () => { },
    //         style: 'primary',
    //         styleClass: '',
    //         visible: true
    //     };

    //     this.dialogs.showMessage({ title: 'Mensagem do Servidor', messages: error.messages, closable: false, buttons: [cancel] });

    // }

    // @Action(ApplicationActions.HandleHttpErrorWithToast)
    // public handleErrorWithToast$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.HandleHttpErrorWithToast): void {
    //     ctx.dispatch(new ApplicationActions.StopGlobalLoading());

    //     const error = HttpErrorHandler.handle(action.error);

    //     for (const message of error.messages) {
    //         ctx.dispatch(new ApplicationActions.SendMessage({ severity: 'error', summary: message }));
    //     }
    // }

    // @Action(ApplicationActions.StartGlobalLoading)
    // public startLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.StartGlobalLoading): void {
    //     ctx.patchState({ isLoading: true });
    // }

    // @Action(ApplicationActions.StopGlobalLoading)
    // public stopLoading$(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.StopGlobalLoading): void {
    //     ctx.patchState({ isLoading: false });
    // }

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
