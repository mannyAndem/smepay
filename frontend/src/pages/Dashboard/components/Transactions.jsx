import TransactionsStats from "../../../features/transactions/TransactionsStats";
import TransactionsTable from "../../../features/transactions/TransactionsTable";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTransactions,
  selectTransactions,
  selectTransactionsStatus,
} from "../../../features/transactions/transactionsSlice";
import { useEffect } from "react";
import { selectCurrentUser } from "../../../features/authentication/authSlice";

const Transactions = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const status = useSelector(selectTransactionsStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions(currentUser.token));
    }
  }, [status, dispatch]);

  if (status === "success") {
    console.log(transactions);
  }
  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h1 className="font-semibold text-2xl">Transactions</h1>
      </div>
      <TransactionsStats transactions={transactions} status={status} />
      <TransactionsTable transactions={transactions} status={status} />
    </div>
  );
};

export default Transactions;
