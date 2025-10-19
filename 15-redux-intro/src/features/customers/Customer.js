import { useSelector } from "react-redux";

function Customer() {
  //* you can do all manupilation to the data inside the useSelector callback functions
  const customerName = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
