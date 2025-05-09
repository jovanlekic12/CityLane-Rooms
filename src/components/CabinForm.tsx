import { useEffect, useState } from "react";
import Button from "./Button";

export type Cabin = {
  id?: string;
  img: string;
  name: string;
  capacity: number;
  price: number;
  discount: number;
  description: string;
};

type CabinFormProps = {
  initialData?: Cabin;
  onSubmit: (data: Cabin) => void;
  setIsFormOpened: (isOpened: boolean) => void;
};

const CabinForm = ({
  initialData,
  onSubmit,
  setIsFormOpened,
}: CabinFormProps) => {
  const [formData, setFormData] = useState<Cabin>({
    id: "",
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
      [name]: ["price", "discount", "capacity"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="cabin-form">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="img"
        value={formData.img}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <input
        name="capacity"
        type="number"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Capacity"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        name="discount"
        type="number"
        value={formData.discount}
        onChange={handleChange}
        placeholder="Discount"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <div className="button-row">
        <Button type="button" onClick={() => setIsFormOpened(false)}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Cabin" : "Create Cabin"}
        </Button>
      </div>
    </form>
  );
};

export default CabinForm;
