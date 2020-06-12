import { AccountsDbState } from 'src/app/core/state/database/accounts/accounts.state';
import { CategoriesDbState } from 'src/app/core/state/database/categories/categories.state';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { CategoriesDbActions } from 'src/app/core/state/database/categories/categories.actions';
import { AccountsDbActions } from 'src/app/core/state/database/accounts/accounts.actions';
import { TransactionsDbActions } from 'src/app/core/state/database/transactions/transactions.actions';
import { AccountTypesDbActions } from 'src/app/core/state/database/account-types/account-types.actions';
import { TrasactionDbState } from 'src/app/core/state/database/transactions/transactions.state';
import { AccountTypesDbState } from 'src/app/core/state/database/account-types/account-types.state';
import { getInitialState as getTransactionsInitialState } from 'src/app/core/state/database/transactions/transactions.state';
import { getInitialState as getCategoriesInitialState } from 'src/app/core/state/database/categories/categories.state';
import { getInitialState as getAccountsInitialState } from 'src/app/core/state/database/accounts/accounts.state';
import { getInitialState as getAccountTypesInitialState } from 'src/app/core/state/database/account-types/account-types.state';

export const rbkConfig: NgxRbkUtilsConfig = {
    applicationName: 'DEMO',
    routes: {
        landing: '/login',
        login: '/login'
    },
    authentication: {
        login: {
            url: `https://dev.meuencartedigital.com.br/auth/login`,
            useGlobalLoading: false,
            errorHandlingType: 'toast',
            responsePropertyName: 'token',
        },
        refreshToken: {
            url: `https://dev.meuencartedigital.com.br/auth/refresh-token`,
            useGlobalLoading: false,
            errorHandlingType: 'toast',
            responsePropertyName: 'refreshToken',
        }
    },
    state: {
        database: {
            // Last item is added first to the store, so keep this list
            // in descending order to keep the state tree organized
            clearFunction: () => ({
                transactions: getTransactionsInitialState(),
                categories: getCategoriesInitialState(),
                accounts: getAccountTypesInitialState(),
                accountTypes: getAccountsInitialState(),

            }),
            states: [
                TrasactionDbState,
                CategoriesDbState,
                AccountTypesDbState,
                AccountsDbState,
            ],
            initializationRequiredActions: [
                AccountsDbActions.LoadAll,
                AccountsDbActions.LoadAllSuccess,

                AccountTypesDbActions.LoadAll,
                AccountTypesDbActions.LoadAllSuccess,

                CategoriesDbActions.LoadAll,
                CategoriesDbActions.LoadAllSuccess,

                TransactionsDbActions.LoadAll,
                TransactionsDbActions.LoadAllSuccess,
            ]
        }
    },
    toastConfig: {
        severity: 'success',
        life: 3000,
        sticky: false,
        closable: true,
        successTitle: 'Success',
        errorTitle: 'Error',
        warningTitle: 'Warning',
        infoTitle: 'Information',
    }
};