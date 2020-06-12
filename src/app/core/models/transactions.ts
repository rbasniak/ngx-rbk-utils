export interface TransactionDetails {
    id: string;
    description: string;
}

export interface TransactionCreation {
    description: string;
}

export interface TransactionUpdate extends TransactionCreation {
    id: string;
}