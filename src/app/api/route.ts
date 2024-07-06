import { TransactionService } from "app/presentation/services/transactions";

const transactionService = new TransactionService();

export async function GET() {
  const transactions = await transactionService.getTransactions();
  return Response.json({ transactions });
}
