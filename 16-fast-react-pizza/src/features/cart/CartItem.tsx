import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

type Item = {
  pizzaId: number;
  name: string;
  quantity: number;
  totalPrice: number;
};

type props = {
  item: Item;
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
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
