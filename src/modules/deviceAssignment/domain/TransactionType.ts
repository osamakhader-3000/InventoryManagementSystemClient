// Mirrors the backend TransactionType enum (serialized as a byte).
export enum TransactionType {
    Assign = 0,
    Update = 1,
    Relocate = 2,
    Return = 3
}

export const transactionTypeLabel = (value: TransactionType): string => TransactionType[value] ?? '';

export const transactionTypeOptions: TransactionType[] = [
    TransactionType.Assign,
    TransactionType.Update,
    TransactionType.Relocate,
    TransactionType.Return
];
