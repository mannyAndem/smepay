import InvoiceDetails from "../../features/invoices/InvoiceDetails";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import { useGetInvoicebyIdQuery } from "../../features/api/apiSlice";

const Invoice = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: invoice,
    error,
    isSuccess,
  } = useGetInvoicebyIdQuery(id);

  return (
    <div className="bg-lightGray flex min-h-screen justify-center items-center">
      {isLoading ? (
        <Loader type="lg" />
      ) : isSuccess ? (
        <div className="bg-gray w-1/2  rounded-md overflow-hidden shadow-md">
          <InvoiceDetails invoice={invoice} />
        </div>
      ) : isError ? (
        <ErrorMessage error={error?.message} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Invoice;
