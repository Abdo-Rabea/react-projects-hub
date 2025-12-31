import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/
type Inputs = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const { isSigningUp, signUp } = useSignUp();
  function onSubmit(data: Inputs) {
    const { fullName, email, password } = data;
    signUp({ fullName, email, password }, { onSuccess: () => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errorMessage={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "please enter your full name" })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "please enter your email",
            pattern: { value: /\S+@\S+\.\S+/, message: "enter a valid email" },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errorMessage={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "please enter your password",
            minLength: {
              value: 8,
              message: "Password should be at least 8 chars",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMessage={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "please enter your password again",
            validate: (confirmPassword, formValues) =>
              formValues.password === confirmPassword ||
              "Passwords don't match",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button
            $variations="secondary"
            type="reset"
            disabled={isSigningUp}
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button disabled={isSigningUp}>
            {isSigningUp ? <SpinnerMini /> : ""} Create new user
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
