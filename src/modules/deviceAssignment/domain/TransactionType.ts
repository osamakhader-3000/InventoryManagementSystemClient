// Mirrors the backend TransactionType enum (serialized as a byte).
export enum TransactionType {
    Assign = 0,
    Update = 1,
    Relocate = 2,
    Return = 3,
    Suspend = 4,
    Activate = 5,
    Sell = 6,
    Create = 7,
    Delete = 8
}

// The backend calls unsuspending a user Activate; the UI calls it Unsuspend.
const labelOverrides: Partial<Record<TransactionType, string>> = {
    [TransactionType.Activate]: 'Unsuspend'
};

export const transactionTypeLabel = (value: TransactionType): string => labelOverrides[value] ?? TransactionType[value] ?? '';

export const transactionTypeOptions: TransactionType[] = [
    TransactionType.Assign,
    TransactionType.Update,
    TransactionType.Relocate,
    TransactionType.Return,
    TransactionType.Suspend,
    TransactionType.Activate,
    TransactionType.Sell,
    TransactionType.Create,
    TransactionType.Delete
];
