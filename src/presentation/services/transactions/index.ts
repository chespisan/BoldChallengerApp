import { TransactionsEntity, TransactionRepository } from "app/domain";

export class TransactionService implements TransactionRepository {
  async getTransactions(): Promise<TransactionsEntity[] | undefined> {
    try {
      const response = await fetch(`${process.env.API_URL_BOLD}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return;
    }
  }
}
