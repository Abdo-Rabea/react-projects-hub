import { formatCurrency } from "../../utils/helpers";

import type { Pizza } from "../../types/pizza";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import type { pizzaItem } from "../../types/pizzaItem";

type props = { pizza: Pizza };

function MenuItem({ pizza }: props) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleAddPizza() {
    const newItem: pizzaItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium text-stone-500 uppercase">Sold out</p>
          )}
          {!soldOut && (
            <Button type="small" onClick={handleAddPizza}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
