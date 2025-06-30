import { useState } from "react";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { UpdateUser, UpdateUserPicture } from "../../../../API/account";
import { toast } from "react-toastify";
import { UserProps } from "../../../../utils/types";

export default function UserDataForm({ token }: UserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userEmail: token?.user?.email,
      userName: token?.user?.user_metadata.FullName,
    },
  });

  async function onSubmit(data: {
    userEmail: string | undefined;
    userName: string;
  }) {
    setIsLoading(true);
    try {
      UpdateUser(data.userName);
      if (img && token?.user?.id) {
        await UpdateUserPicture(img, token?.user?.id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      toast("User succesfully updated");
    }
  }

  return (
    <form className="settings__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__div">
        <label className="form__label">Email address</label>
        <input
          readOnly
          type="text"
          {...register("userEmail", { required: "User email is required" })}
          className="form__input readonly"
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
        <label className="form__label">User photo</label>
        <input
          type="file"
          className="img__input"
          onChange={(e) => setImg(e.target.files?.[0] || null)}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update account"}
      </Button>
    </form>
  );
}
