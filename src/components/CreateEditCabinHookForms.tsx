import Button from "./Button";
import { Cabin } from "../utils/types";
import { useForm } from "react-hook-form";
import { EditCabin, InsertNewCabin } from "../API/cabins";

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
    formState: { errors },
  } = useForm({
    defaultValues: initialData ? initialData : {},
  });

  async function onSubmit(data: Cabin) {
    if (initialData) {
      await EditCabin(data);
    } else {
      data.id = self.crypto.randomUUID();
      await InsertNewCabin(data);
    }
    setIsFormOpened(false);
    setCabinForEdit(null);
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
            {...register("img", { required: "Cabin photo is required" })}
            type="file"
            className="img__input"
          />
          {errors.img?.message && (
            <p className="form__err">{errors.img.message}</p>
          )}
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
