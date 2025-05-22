import { useForm } from "react-hook-form";
import FormBlock from "../../../../components/FormBlock";
import Button from "../../../../components/Button";
import { newUser } from "../../../../utils/types";
import { supabase } from "../../../../supabase/supabase";
import { inserNewUser } from "../../../../API/users";

type FormProps = {
  setIsFormOpened: (isOpened: boolean) => void;
};

export default function CreateUserForm({ setIsFormOpened }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newUser>();

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
    { name: "confirmPassword", label: "Confirm password", type: "text" },
  ];

  async function onSubmit(data: newUser) {
    if (data.confirmPassword !== data.userPassword) {
      console.log("kurac");
    }
    const { error } = await inserNewUser(data);
  }

  return (
    <div className="form__overlay">
      <form className="user__form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <FormBlock
            key={field.name}
            {...field}
            register={register}
            errors={errors}
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
