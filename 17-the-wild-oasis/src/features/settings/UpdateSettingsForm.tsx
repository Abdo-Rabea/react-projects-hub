import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { settings, isPending, isError, error } = useSettings();

  if (isPending) return <Spinner />;
  if (isError) return <div>{error?.message}</div>;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
