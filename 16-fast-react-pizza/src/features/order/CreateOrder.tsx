import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { clearCart, selectCart, selectCartTotalPrice } from "../cart/cartSlice";
import store from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress, selectUser } from "../user/userSlice";

// import type { Route } from "+types/project";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((store: RootState) => store.user.username);

  const dispatch = useDispatch<AppDispatch>();

  const errors = useActionData();
  const cart = useSelector(selectCart);

  const cartPrice = useSelector(selectCartTotalPrice);
  const priorityPrice = withPriority ? cartPrice * 0.2 : 0;
  const totalPrice = cartPrice + priorityPrice;

  // address
  const { address, status, error: addressError } = useSelector(selectUser);
  const isLoadingAddress = status === "loading";

  function handleGetAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-5">
      <h2 className="mb-7 text-xl font-semibold text-stone-700">
        Ready to order? Let's go!
      </h2>
      {/* *wow every thing is handled inside the form so no states are required */}
      {
        /* <Form method="POST" action="/order/new"> */
        // no need to write the action here because react-router will match it with the closest action (just like loader)
      }
      <Form method="POST" action="/order/new" className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <label htmlFor="customerName" className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customer"
            required
            className="input flex-1"
            defaultValue={username}
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <label
            htmlFor="phone"
            className={`${errors?.phone ? "sm:-mt-10" : ""} sm:basis-40`}
          >
            Phone number
          </label>
          {/* it works because of flex-basis: 0 instead of auto <- fit-content */}
          <div className="flex-1">
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="input w-full"
            />
            {errors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="sm flex flex-col gap-1 sm:flex-row sm:items-center">
          <label
            htmlFor="address"
            className={`${status === "error" ? "sm:-mt-10" : ""} sm:basis-40`}
          >
            Address
          </label>
          <div className="relative flex-1" key={address}>
            <input
              className="input w-full"
              type="text"
              id="address"
              name="address"
              required
              defaultValue={address}
            />
            {status === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
            <span className="absolute top-[3px] right-[3px] z-50">
              {address === "" && (
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={handleGetAddress}
                >
                  Get location
                </Button>
              )}
            </span>
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 focus:accent-yellow-400 focus:ring-3 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            value={String(withPriority)}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(String(data.cart)),
  };

  // form validation
  const errors: { phone?: string } = {};
  if (!isValidPhone(String(data.phone))) {
    errors.phone = "Please Enter correct phone number";
  }

  if (Object.entries(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
