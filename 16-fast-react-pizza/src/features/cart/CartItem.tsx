import type { pizzaItem } from "../../types/pizzaItem";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

type props = {
  item: pizzaItem;
};

function CartItem({ item }: props) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-x-4">
        <p className="">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
