import { Cabin } from "../utils/types";
import Button from "./Button";

type FormProps = {
  setIsFormOpened: (isOpened: boolean) => void;
  handleNewCabin: (key: string, value: string | number) => void;
  handleSubmit: (cabin: Cabin, event: React.FormEvent<HTMLFormElement>) => void;
  newCabin: Cabin;
};

export default function CabinForm({
  setIsFormOpened,
  handleNewCabin,
  handleSubmit,
  newCabin,
}: FormProps) {
  return (
    <div className="form__overlay">
      <form className="cabin__form" onSubmit={(e) => handleSubmit(newCabin, e)}>
        <div className="form__div">
          <label className="form__label">Cabin name</label>
          <input
            onChange={(e) => handleNewCabin(e.target.name, e.target.value)}
            type="text"
            name="name"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Maximum capacity</label>
          <input
            onChange={(e) => handleNewCabin(e.target.name, e.target.value)}
            type="number"
            name="capacity"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Regular price</label>
          <input
            onChange={(e) => handleNewCabin(e.target.name, e.target.value)}
            type="number"
            name="price"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Discount</label>
          <input
            onChange={(e) => handleNewCabin(e.target.name, e.target.value)}
            type="number"
            name="discount"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Description for website</label>
          <input
            onChange={(e) => handleNewCabin(e.target.name, e.target.value)}
            type="text"
          />
        </div>
        <div className="form__div">
          <label className="form__label">Cabin photo</label>
          <input
            onChange={(e) => handleNewCabin(e.target.name, e.target.value)}
            type="text"
            name="photo"
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
          <Button type="submit">Create new cabin</Button>
        </div>
      </form>
    </div>
  );
}
