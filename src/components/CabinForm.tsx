import { useEffect, useState } from "react";
import Button from "./Button";
import { EditCabin, InsertNewCabin } from "../API/cabins";
import { Cabin } from "../utils/types";

type CabinFormProps = {
  initialData?: Cabin | null;
  setIsFormOpened: (isOpened: boolean) => void;
};

const CabinForm = ({ initialData, setIsFormOpened }: CabinFormProps) => {
  const [formData, setFormData] = useState<Cabin>({
    id: self.crypto.randomUUID(),
    img: "",
    name: "",
    capacity: 1,
    price: 0,
    discount: 0,
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      EditCabin(formData);
    } else {
      InsertNewCabin(formData);
    }
    setIsFormOpened(false);
  };
  return (
    <div className="form__overlay">
      <form onSubmit={handleSubmit} className="cabin__form">
        <div className="form__div">
          <label className="form__label">Cabin name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Maximum capacity</label>
          <input
            value={formData.capacity}
            onChange={handleChange}
            type="number"
            name="capacity"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Regular price</label>
          <input
            value={formData.price}
            onChange={handleChange}
            type="number"
            name="price"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Discount</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div className="form__div">
          <label className="form__label">Description for website</label>
          <input
            value={formData.description}
            onChange={handleChange}
            type="text"
            name="description"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Cabin photo</label>
          <input
            value={formData.img}
            onChange={handleChange}
            type="text"
            name="img"
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
          <Button type="submit">
            {initialData ? "Edit cabin" : "Create new cabin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CabinForm;
