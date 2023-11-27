import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "./clientSlice";

const ClientList = () => {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const [clientName, setClientName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClient({ name: clientName }));
  };

  return (
    <>
      <ul>
        {clients.map((client) => (
          <li>{client.name}</li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default ClientList;
