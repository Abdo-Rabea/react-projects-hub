import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mx-4 my-6 space-y-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-3 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
