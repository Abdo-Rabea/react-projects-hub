import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

type FieldTypes =
  | "minBookingLength"
  | "maxBookingLength"
  | "maxGuestsPerBooking"
  | "breakfastPrice";
function UpdateSettingsForm() {
  const { settings, isPending, isError, error } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isPending) return <Spinner />;
  if (isError) return <div>{error?.message}</div>;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  function handleUpdateField(field: FieldTypes, value: number) {
    if (value < 0) return;
    if (settings && value === settings[field]) {
      return;
    }

    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleUpdateField("minBookingLength", Number(e.target.value))
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) =>
            handleUpdateField("maxBookingLength", Number(e.target.value))
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleUpdateField("maxGuestsPerBooking", Number(e.target.value))
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) =>
            handleUpdateField("breakfastPrice", Number(e.target.value))
          }
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
