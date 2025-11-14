import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { clearCart, selectCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector((store: RootState) => store.user.username);
  const cart = useSelector(selectCart);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 mb-2 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-9 space-x-4">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
