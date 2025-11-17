import { useFetcher, type ActionFunctionArgs } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrderPriority() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" disabled={fetcher.state !== "idle"}>
        Make Priority
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  await updateOrder(params.orderId ?? "", { priority: true });
  return null;
}

export default UpdateOrderPriority;
