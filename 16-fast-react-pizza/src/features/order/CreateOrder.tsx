import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

// import type { Route } from "+types/project";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((store: RootState) => store.user.username);

  const errors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

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
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="flex-1">
            <input
              className="input w-full"
              type="text"
              id="address"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-10 flex items-center gap-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 focus:accent-yellow-400 focus:ring-3 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
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
    priority: data.priority === "on",
    cart: JSON.parse(String(data.cart)),
  };

  // form validation
  const errors: { phone?: string } = {};
  if (!isValidPhone(String(data.phone))) {
    errors.phone = "Please Enter correct phone number";
  }

  if (Object.entries(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
