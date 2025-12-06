import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import type { Cabin } from "../../types/cabin";
import type { FromCabin } from "../../types/FormCabin";
import { useCreateEditCabin } from "./useCreateEditCabin";

function CreateEditCabinForm({
  cabin,
  onCloseModal,
}: {
  cabin?: Cabin;
  onCloseModal?: () => void;
}) {
  const isEditSession = !!cabin;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FromCabin>({
    defaultValues: {
      name: cabin?.name,
      description: cabin?.description,
      discount: cabin?.discount,
      maxCapacity: cabin?.maxCapacity,
      regularPrice: cabin?.regularPrice,
      image: undefined,
    },
  });

  const { createEditCabin, isWorking } = useCreateEditCabin(isEditSession);

  function onSubmit(data: FromCabin) {
    if (isEditSession) {
      createEditCabin(
        {
          data: {
            ...data,
            image: data?.image[0] ? data.image[0] : cabin.image,
          },
          id: cabin?.id,
        },
        { onSuccess: () => reset() }
      );
    } else
      createEditCabin(
        { data: { ...data, image: data.image[0] } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onError(_error: object) {
    // console.log("onError", error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="cabin name" errorMessage={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={errors.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Discount should be at least 0",
            },
            validate: (value: number, formValues: FromCabin) =>
              Number(value) < Number(formValues.regularPrice) ||
              "the discount should be lower than price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo" errorMessage={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            disabled={isWorking}
            $variations="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Add cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
