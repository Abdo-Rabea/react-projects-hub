// Test ID: IIDSAT

import {
  useFetcher,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import type { Item } from "../../types/OrderItem";
import { useEffect } from "react";
import type { Pizza } from "../../types/pizza";
import UpdateOrderPriority from "./UpdateOrderPriority";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const menu = fetcher.data;

  const MapIDToIngredients: { [key: string]: string[] } = {};
  menu?.forEach((item: Pizza) => {
    MapIDToIngredients[String(item.id)] = item.ingredients;
  });

  return (
    <div className="space-y-4 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="text-sm">
          {priority && (
            <span className="mr-2 rounded-full bg-red-500 px-3 py-1 font-semibold tracking-wider text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold tracking-wider text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs font-semibold text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y-2 divide-stone-200 border-y-2 border-stone-200">
        {cart.map((item: Item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={MapIDToIngredients[item.pizzaId]}
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold text-stone-700">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrderPriority />}
    </div>
  );
}
export async function loader({ params }: LoaderFunctionArgs) {
  return await getOrder(String(params.orderId));
}
export default Order;
