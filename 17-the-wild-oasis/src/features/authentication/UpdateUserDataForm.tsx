import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user!;
  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { isUpdating, updateUser } = useUpdateUser();
  const isValidSubmit = (avatar || fullName !== currentFullName) && fullName;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!isValidSubmit) return;
    updateUser(
      {
        fullName: fullName === currentFullName ? undefined : fullName,
        avatar,
      },
      {
        onSuccess: () => {
          form.reset();
          handleCancle();
        },
      }
    );
  }

  function handleCancle() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            $variations="secondary"
            onClick={handleCancle}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button disabled={!isValidSubmit || isUpdating}>
            Update account
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
