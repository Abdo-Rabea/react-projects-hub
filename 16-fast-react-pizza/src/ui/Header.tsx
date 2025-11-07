import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-b-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="font-pizza text-xl tracking-widest sm:text-2xl">
        fast react pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}

export default Header;
