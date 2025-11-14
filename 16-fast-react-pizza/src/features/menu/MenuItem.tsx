import { formatCurrency } from "../../utils/helpers";

import type { Pizza } from "../../types/pizza";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectPizzaQuantityById } from "../cart/cartSlice";
import type { pizzaItem } from "../../types/pizzaItem";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

type props = { pizza: Pizza };

function MenuItem({ pizza }: props) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(selectPizzaQuantityById(id));
  const isInCart = currentQuantity > 0;
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
          {isInCart && (
            <div className="flex items-center gap-8">
              <UpdateItemQuantity id={id} quantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
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
