export class Transaction {
    userId: string;
    timestamp: number;
    type: TransactionType;
    data: any;
}

export enum TransactionType {
    WRITE, DELETE    
}
