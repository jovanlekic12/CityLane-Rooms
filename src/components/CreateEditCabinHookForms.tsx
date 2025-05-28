import Button from "./Button";
import FormBlock from "./FormBlock";
import { Cabin } from "../utils/types";
import { useCabinForm } from "../hooks/useCabinForm";
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
  const onSuccess = () => {
    setIsFormOpened(false);
    setCabinForEdit(null);
  };

  const { register, handleSubmit, errors, onSubmit, setImg, loading } =
    useCabinForm(initialData || null, onSuccess);

  const fields = [
    { name: "name", type: "text", label: "Cabin name" },
    { name: "capacity", type: "number", label: "Maximum capacity" },
    { name: "price", type: "number", label: "Regular price" },
    { name: "discount", type: "number", label: "Discount" },
    { name: "description", type: "text", label: "Description for website" },
  ];

  return (
    <div className="form__overlay">
      <form className="cabin__form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <FormBlock<Cabin>
            key={field.name}
            name={field.name as keyof Cabin}
            label={field.label}
            type={field.type}
            register={register}
            errors={errors}
          />
        ))}
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
          <Button type="submit" disabled={loading}>
            {initialData ? "Edit cabin" : "Create new cabin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditCabinHookForm;
