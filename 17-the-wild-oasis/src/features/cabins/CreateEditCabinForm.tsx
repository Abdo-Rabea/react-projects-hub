import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "./FormRow";
import type { CabinPayload, FromCabin } from "../../types/FormCabin";
import type { Cabin } from "../../types/cabin";

function CreateEditCabinForm({ cabin }: { cabin?: Cabin }) {
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

  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: ({ data, id }: { data: CabinPayload; id?: number }) =>
      createEditCabin(data, id),
    onSuccess: () => {
      // reset the form
      reset();

      // invalidate to refetch the cabins data to update ui
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      toast.success(
        isEditSession
          ? "Cabin is edited successfully"
          : "Cabin is created successfully"
      );
    },
    onError(er) {
      toast.error(er.message);
    },
  });

  function onSubmit(data: FromCabin) {
    if (isEditSession) {
      mutate({
        data: { ...data, image: data?.image[0] ? data.image[0] : cabin.image },
        id: cabin?.id,
      });
    } else mutate({ data: { ...data, image: data.image[0] } });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onError(_error: object) {
    // console.log("onError", error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="cabin name" errorMessage={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value: number, formValues: FromCabin) =>
              Number(value) < Number(formValues.regularPrice) ||
              "the discount should be lower than price",
          })}
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo" errorMessage={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <>
          <Button disabled={isCreating} $variations="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isEditSession ? "Edit cabin" : "Add cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
