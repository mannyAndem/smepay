import TransactionsStats from "../../../features/transactions/TransactionsStats";
import TransactionsTable from "../../../features/transactions/TransactionsTable";

const Transactions = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h1 className="font-semibold text-2xl">Transactions</h1>
      </div>
      <TransactionsStats />
      <TransactionsTable />
    </div>
  );
};

export default Transactions;
