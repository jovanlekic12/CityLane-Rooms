import { useState } from "react";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../../supabase/supabase";
import { userEmail } from "../../../../utils/constants";
import { UserProps } from "../../../../utils/types";

export default function UserDataForm({ token }: UserProps) {
  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userEmail: token?.user?.email,
      userName: token?.user?.user_metadata.FullName,
    },
  });

  async function onSubmit(data: User) {}

  return (
    <form className="settings__form">
      <div className="form__div">
        <label className="form__label">Email address</label>
        <input
          readOnly
          type="text"
          {...register("userEmail", { required: "User email is required" })}
          className="form__input"
        />
        {errors.userEmail?.message && (
          <p className="form__err">{errors.userEmail?.message as string}</p>
        )}
      </div>
      <div className="form__div">
        <label className="form__label">Full name</label>
        <input
          type="text"
          {...register("userName", { required: "Full name is required" })}
          className="form__input"
        />
        {errors.userName?.message && (
          <p className="form__err">{errors.userName?.message as string}</p>
        )}
      </div>
      <div className="form__div">
        <label className="form__label">Cabin photo</label>
        <input
          type="file"
          className="img__input"
          onChange={(e) => setImg(e.target.files?.[0] || null)}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update account"}
      </Button>
    </form>
  );
}
