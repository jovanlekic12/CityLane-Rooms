import Button from "./Button";
import { Cabin } from "../utils/types";
import { useForm } from "react-hook-form";
import { EditCabin, InsertNewCabin } from "../API/cabins";
import { useState } from "react";
import { supabase } from "../supabase/supabase";

type CabinFormProps = {
  initialData?: Cabin | null;
  setIsFormOpened: (isOpened: boolean) => void;
  setCabinForEdit: (cabinForEdit: null) => void;
};

const CreateEditCabinHookForm = ({
  initialData,
  setIsFormOpened,
  setCabinForEdit,
}: CabinFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
      ? initialData
      : {
          id: self.crypto.randomUUID(),
        },
  });

  const [img, setImg] = useState<File | null>(null);

  // async function onSubmit(data: Cabin) {
  //   if (initialData) {
  //     await EditCabin(data);
  //   } else {
  //     data.id = self.crypto.randomUUID();
  //     await InsertNewCabin(data);
  //   }
  //   setIsFormOpened(false);
  //   setCabinForEdit(null);
  // }

  console.log(watch(), initialData?.id);

  async function onSubmit(data: Cabin) {
    try {
      if (img) {
        if (initialData) {
          const { error: removeError } = await supabase.storage
            .from("cabin-photos")
            .remove([`${data.id}.jpg`]);

          console.log(initialData.id);
          if (removeError) {
            throw removeError;
          }
        }
        const { error } = await supabase.storage
          .from("cabin-photos")
          .upload(`${data.id}.jpg`, img);

        if (error) throw error;
      }

      if (initialData) {
        await EditCabin(data);
      } else {
        await InsertNewCabin(data);
      }

      setIsFormOpened(false);
      setCabinForEdit(null);
    } catch (error) {
      console.error("Error uploading photo or submitting cabin:", error);
    }
  }

  return (
    <div className="form__overlay">
      <form
        className="cabin__form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="form__div">
          <label className="form__label">Cabin name</label>
          <input
            type="text"
            {...register("name", { required: "Cabin name is required" })}
          />
          {errors.name?.message && (
            <p className="form__err">{errors.name.message}</p>
          )}
        </div>
        <div className="form__div">
          <label className="form__label">Maximum capacity</label>
          <input
            {...register("capacity", {
              required: "Cabin capacity is required",
            })}
            type="number"
          />
          {errors.capacity?.message && (
            <p className="form__err">{errors.capacity.message}</p>
          )}
        </div>
        <div className="form__div">
          <label className="form__label">Regular price</label>
          <input
            {...register("price", { required: "Cabin price is required" })}
            type="number"
          />
          {errors.price?.message && (
            <p className="form__err">{errors.price.message}</p>
          )}
        </div>
        <div className="form__div">
          <label className="form__label">Discount</label>
          <input
            {...register("discount", {
              required: "Cabin discount is required",
            })}
            type="number"
          />
          {errors.discount?.message && (
            <p className="form__err">{errors.discount.message}</p>
          )}
        </div>
        <div className="form__div">
          <label className="form__label">Description for website</label>
          <input {...register("description")} type="text" />
        </div>
        <div className="form__div">
          <label className="form__label">Cabin photo</label>
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
              setCabinForEdit(null);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Edit cabin" : "Create new cabin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditCabinHookForm;
