import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoice from "./pages/Invoice/Invoice";

function App() {
  // const count = useSelector((state) => state.counter.value);

  // const dispatch = useDispatch();

  // // goal is to build a simple counter application using redux

  //   return <button onClick={() => dispatch(increment())}>{count}</button>;
  //

  return (
    <Routes>
      <Route path="/invoices/:id" element={<Invoice />} />
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
