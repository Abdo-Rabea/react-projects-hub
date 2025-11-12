import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCartTotalPrice, selectCartTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity: number = useSelector(selectCartTotalQuantity);
  const totalCartPrice: number = useSelector(selectCartTotalPrice);

  if (totalCartQuantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm font-semibold text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
