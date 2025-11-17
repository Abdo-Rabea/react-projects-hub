import type { Item } from "../../types/OrderItem";
import { formatCurrency } from "../../utils/helpers";

function OrderItem({
  item,
  ingredients,
  isLoadingIngredients,
}: {
  item: Item;
  ingredients: string[] | undefined;
  isLoadingIngredients: boolean;
}) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients);
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-2 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>

        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
