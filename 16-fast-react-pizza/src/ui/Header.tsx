import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <div>
      <h1>Header</h1>
      <Link to="/">Home page</Link>
      <SearchOrder />
    </div>
  );
}

export default Header;
