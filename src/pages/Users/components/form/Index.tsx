import { useForm } from "react-hook-form";
import FormBlock from "../../../../components/FormBlock";
import Button from "../../../../components/Button";
import { newUser } from "../../../../utils/types";
import { inserNewUser } from "../../../../API/users";
import { useState } from "react";
import { supabase } from "../../../../supabase/supabase";

type FormProps = {
  setIsFormOpened: (isOpened: boolean) => void;
};

export default function CreateUserForm({ setIsFormOpened }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newUser>();

  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "userFullname", label: "Full name", type: "test" },
    { name: "userEmail", label: "Email address", type: "text" },
    {
      name: "userPassword",
      label: "Password (min 6 characters)",
      type: "password",
      minLength: {
        value: 6,
        minMessage: "Password should be at least 6 characters",
      },
    },
  ];

  async function onSubmit(data: newUser) {
    setLoading(true);
    const { user } = await inserNewUser(data);
    if (img) {
      try {
        await supabase.storage
          .from("user-photos")
          .upload(`${user?.id}.jpg`, img);
        console.log(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    setIsFormOpened(false);
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
          />
        ))}
        <div className="form__div">
          <label className="form__label">User photo</label>
          <input
            type="file"
            className="img__input"
            onChange={(e) => setImg(e.target.files?.[0] || null)}
          />
        </div>
        <div className="form__buttons__div">
          <Button
            type="cancel"
            onClick={() => {
              setIsFormOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Create new user"}
          </Button>
        </div>
      </form>
    </div>
  );
}
