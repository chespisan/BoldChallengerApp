import { TransactionEntity } from "app/domain";
import { DashboardContainer } from "app/presentation";

export default async function Dashboard() {
  const api = process.env.API_LOCAL;
  const response = await fetch(`${api}/api`);
  const { transactions } = await response.json();
  const currentTransactions = transactions.data as TransactionEntity[];

  return <DashboardContainer data={currentTransactions} />;
}
