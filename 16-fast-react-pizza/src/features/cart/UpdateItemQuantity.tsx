import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  const dispatch = useDispatch();

  function handleDecreaseQuantity() {
    dispatch(decreaseItemQuantity(id));
  }
  function handleIncreaseQuantity() {
    dispatch(increaseItemQuantity(id));
  }
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span>{quantity}</span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
