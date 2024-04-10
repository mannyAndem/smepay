import TransactionsStats from "../../../../features/transactions/TransactionsStats";
import TransactionsTable from "../../../../features/transactions/TransactionsTable";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTransactions,
  selectTransactions,
  selectTransactionsError,
  selectTransactionsStatus,
} from "../../../../features/transactions/transactionsSlice";
import { useEffect } from "react";
import { selectCurrentUser } from "../../../../features/authentication/authSlice";
import Loader from "../../../../ui/Loader";
import ReloadButton from "../../../../ui/ReloadButton";
import ErrorMessage from "../../../../ui/ErrorMessage";
import wip from "../../../../assets/wip.svg";

const Transactions = () => {
  const transactions = useSelector(selectTransactions);
  const error = useSelector(selectTransactionsError);
  const dispatch = useDispatch();
  const status = useSelector(selectTransactionsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  return (
    // <div>
    //   <div className="flex justify-between items-center my-6">
    //     <h1 className="font-semibold text-2xl">Transactions</h1>
    //   </div>
    //   {status === "success" ? (
    //     <>
    //       <TransactionsStats transactions={transactions} status={status} />
    //       <TransactionsTable transactions={transactions} status={status} />
    //     </>
    //   ) : status === "pending" ? (
    //     <div className="mt-24">
    //       <Loader type="lg" />
    //     </div>
    //   ) : status === "error" ? (
    //     <ErrorMessage error={error} />
    //   ) : (
    //     <div></div>
    //   )}
    // </div>
    <div className="px-24 pb-24">
      <div className="mx-auto max-w-[600px]">
        <img src={wip} alt="Developer at work" className="w-full" />
      </div>
      <p className="text-4xl text-center text-blue font-semibold">
        Coming soon!
      </p>
    </div>
  );
};

export default Transactions;
