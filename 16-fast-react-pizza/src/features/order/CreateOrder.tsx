import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
// import type { Route } from "+types/project";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
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

  const errors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/* *wow every thing is handled inside the form so no states are required */}
      {
        /* <Form method="POST" action="/order/new"> */
        // no need to write the action here because react-router will match it with the closest action (just like loader)
      }
      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {errors?.phone && <p>{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </button>
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

  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
