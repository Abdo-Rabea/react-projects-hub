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
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
