export interface AccountDetails {
    id: string;
    name: string;
}

export interface AccountCreation {
    name: string;
    typeId: string;
}

export interface AccountUpdate extends AccountCreation {
    id: string;
}