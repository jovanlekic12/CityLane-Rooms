import { useForm } from "react-hook-form";
import FormBlock from "../../../../components/FormBlock";
import Button from "../../../../components/Button";
import { newUser } from "../../../../utils/types";
import { supabase } from "../../../../supabase/supabase";
import { inserNewUser } from "../../../../API/users";
import { useState } from "react";

type FormProps = {
  setIsFormOpened: (isOpened: boolean) => void;
};

export default function CreateUserForm({ setIsFormOpened }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newUser>();

  const [validationError, setValidationError] = useState<null | string>(null);

  const fields = [
    { name: "fullName", label: "Full name", type: "test" },
    { name: "userEmail", label: "Email address", type: "text" },
    {
      name: "userPassword",
      label: "Password (min 6 characters)",
      type: "text",
      minLength: {
        value: 6,
        minMessage: "Password should be at least 6 characters",
      },
    },
  ];

  async function onSubmit(data: newUser) {
    const { error } = await inserNewUser(data);
  }

  return (
    <div className="form__overlay">
      <form className="user__form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <FormBlock<newUser>
            key={field.name}
            name={field.name as keyof newUser}
            label={field.label}
            type={field.type}
            value={field?.minLength?.value}
            minMessage={field?.minLength?.minMessage}
            register={register}
            errors={errors}
            validationError={validationError}
          />
        ))}
        <div className="form__buttons__div">
          <Button
            type="cancel"
            onClick={() => {
              setIsFormOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Create new user</Button>
        </div>
      </form>
    </div>
  );
}
