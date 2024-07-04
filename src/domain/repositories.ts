import { TransactionsEntity } from "./entities";

export interface TransactionRepository {
  getTransactions(): Promise<TransactionsEntity[]>;
}
